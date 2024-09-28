import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent {

  constructor() {

  const obs$ = new Observable( observer => {

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

  obs$.subscribe({
     next: (v) => console.log('Subs:', v),
     error: (e) => console.warn('Error', e),
     complete: () => console.info('Obs terminado')
  });

  }

}
