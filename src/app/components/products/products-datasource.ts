import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Product } from 'src/app/models/product';

// TODO: Replace this with your own data model type
// export interface ProductsItem {
//   name: string;
//   id: number;
// }

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Product[] = [
  {
    productId: 1,
    title: "title 1",
    description: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    price: "100"
  },
  {
    productId: 2,
    title: "title 1",
    description: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/771796",
    price: "420"
  },
  {
    productId: 3,
    title: "title 1",
    description: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/24f355",
    price: "789"
  },
  {
    productId: 4,
    title: "title 1",
    description: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    price: "100"
  },
  {
    productId: 5,
    title: "title 1",
    description: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/771796",
    price: "420"
  },
  {
    productId: 6,
    title: "title 1",
    description: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/24f355",
    price: "789"
  },
  {
    productId: 7,
    title: "title 1",
    description: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    price: "100"
  },
  {
    productId: 8,
    title: "title 1",
    description: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/771796",
    price: "420"
  }
];

/**
 * Data source for the Products view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductsDataSource extends DataSource<Product> {
  data: Product[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Product[]): Product[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Product[]): Product[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
