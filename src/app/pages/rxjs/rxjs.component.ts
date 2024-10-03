import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval} from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent implements OnDestroy {

  intervalSubs: Subscription;

  constructor() {
  
  // this.devuelveObservable().pipe( retry(2) ).subscribe({
  //    next: (v) => console.log('Subs:', v),
  //    error: (e) => console.warn('Error', e),
  //    complete: () => console.info('Obs terminado')
  // });

  this.intervalSubs = this.devuelveInterval().subscribe();

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  devuelveInterval(): Observable<number> { 

    return interval(500)
                      .pipe(
                        map( valor => valor + 1 ),
                        filter( valor => ( valor % 2 === 0) ? true : false),
                        take(10)
                      );
  }

  devuelveObservable(): Observable<number> {
    
    const obs$ = new Observable<number>( observer => {

      let i = -1;
  
      const intervalo = setInterval(() => {
      
        i++;
        observer.next(i);
  
        if(i === 4){
          clearInterval( intervalo );
          observer.complete()
        }
  
        if(i === 2){
          observer.error('i = 2');
        }
  
      }, 1000 )

    } );

    return obs$;
  }

}
