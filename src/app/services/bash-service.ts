import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  or,
  query,
  where,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { BatchSummary } from '../models/batch.model';

@Injectable({
  providedIn: 'root',
})
export class BashService {
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

  async addBatch(batch: any): Promise<any> {
    const documentRef = doc(this.firestore, 'batches', batch.batchId);
    const snapShot = await getDoc(documentRef);
    if (!snapShot.exists()) {
      const ref = collection(this.firestore, 'batches');
      const newBatch = {
        ...batch,
        status: 'Primary Fermentation',
        creationDate: new Date(),
      };
      await addDoc(ref, newBatch);
    } else {
      throw new Error('Batch already exists');
    }
  }
}
