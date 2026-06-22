import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  collectionData,
  getDoc,
  getDocs,
  or,
  orderBy,
  query,
  setDoc,
  where,
  updateDoc,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import {
  BatchConditioningModel,
  BatchCreationFormModel,
  BatchFermentationFormModel,
  BatchManagementModel,
  BatchPackagingModel,
  BatchSummary,
} from '../models/batch.model';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  private firestore = inject(Firestore);

  getBatchList(searchText: string, status: string): Observable<BatchSummary[]> {
    const collectionRef = collection(this.firestore, 'batches');
    const filters: any[] = [];
    if (status !== '') {
      filters.push(where('status', '==', status));
    }
    if (searchText !== '') {
      filters.push(or(where('batchId', '==', searchText), where('name', '==', searchText)));
    }

    const finalQuery = query(collectionRef, ...filters);

    return collectionData(finalQuery).pipe(
      map((documents: any[]) => {
        return documents.map((doc) => {
          return {
            batchId: doc.batchId,
            name: doc.name,
            status: doc.status,
            creationDate: new Date(doc.creationDate),
          } as BatchSummary;
        });
      }),
    );
  }

  async addBatch(batch: BatchCreationFormModel): Promise<any> {
    const documentRef = doc(this.firestore, 'batches', batch.batchId);
    const snapShot = await getDoc(documentRef);

    if (!snapShot.exists()) {
      const newBatch = {
        ...batch,
        status: 'Fermentation',
        creationDate: new Date(),
      };
      await setDoc(documentRef, newBatch);

      const ref = collection(this.firestore, `batches/${batch.batchId}/fermentation`);
      await addDoc(ref, {
        density: batch.originalGravity,
        temperature: '24',
        creationDate: new Date(),
        notes: 'Medición inicial',
      });
    } else {
      throw new Error('Batch already exists');
    }
  }

  async getBatch(batchId: string): Promise<BatchManagementModel> {
    const documentRef = doc(this.firestore, 'batches', batchId);
    try {
      const docSnapshot = await getDoc(documentRef);
      if (docSnapshot.exists()) {
        const fermentationData = await this.getFermentationData(batchId);
        return {
          batchId: docSnapshot.data()['batchId'],
          name: docSnapshot.data()['name'],
          status: docSnapshot.data()['status'],
          creationDate: docSnapshot.data()['creationDate'],
          fermentation: fermentationData,
        };
      } else return {} as BatchManagementModel;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async addFermentationData(
    batchId: string,
    batchFermentationFormModel: BatchFermentationFormModel,
  ): Promise<void> {
    const ref = collection(this.firestore, `batches/${batchId}/fermentation`);
    await addDoc(ref, batchFermentationFormModel);
  }

  async addConditioningData(batchId: string, conditioning: BatchConditioningModel): Promise<void> {
    const ref = collection(this.firestore, `batches/${batchId}/conditioning`);
    await addDoc(ref, conditioning);
  }

  async addPackagingData(batchId: string, batchPackagingModel: BatchPackagingModel) {
    const documentRef = doc(this.firestore, 'batches', batchId);
    try {
      await updateDoc(documentRef, {
        status: 'Packaging',
        packaging: batchPackagingModel,
      });
    } catch (e) {
      throw e;
    }
  }

  async getFermentationData(batchId: string): Promise<BatchFermentationFormModel[]> {
    const fermentationRef = collection(this.firestore, `batches/${batchId}/fermentation`);
    const fermentationQuery = query(fermentationRef, orderBy('creationDate'));
    const fermentationSnapshot = await getDocs(fermentationQuery);
    return fermentationSnapshot.docs.map((doc) => {
      return {
        density: doc.data()['density'],
        temperature: doc.data()['temperature'],
        creationDate: new Date(doc.data()['creationDate'].toMillis()),
        notes: doc.data()['notes'],
      };
    });
  }

  async getConditioningData(batchId: string): Promise<BatchConditioningModel[]> {
    const conditioningRef = collection(this.firestore, `batches/${batchId}/conditioning`);
    const conditioningQuery = query(conditioningRef, orderBy('creationDate'));
    const conditioningSnapshot = await getDocs(conditioningQuery);
    return conditioningSnapshot.docs.map((doc) => {
      return {
        name: doc.data()['name'],
        volume: doc.data()['volume'],
        temperature: doc.data()['temperature'],
        creationDate: new Date(doc.data()['creationDate'].toMillis()),
        notes: doc.data()['notes'],
      };
    });
  }
}
