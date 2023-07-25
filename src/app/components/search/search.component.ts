import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, debounceTime, takeUntil } from 'rxjs';
import { University } from 'src/app/interface/university.interface';
import { UniversitiesService } from 'src/app/services/universities.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  public country = "";
  public searchText = "";
  public universities: University[] = [];
  private unsubscribe$ = new Subject<void>();
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  constructor(private universitiesService: UniversitiesService) { }


  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value => {
        this.getResults(value);
      })
  };


  getCountry(event: any) {
    this.country = event.target.defaultValue;
    this.universities = [];
    this.searchText = "";
  };


  getClass(value: string) {
    return (this.country === value) ? 'btn btn-success' : 'btn btn-primary';
  };


  onKeyPress(searchText: string) {
    this.debouncer.next(searchText);
  };


  getResults(value: any) {
    if (this.searchText.length == 0) {
      this.universities = [];
    } else if (this.country.length > 0) {
      this.searchText = value
      this.universitiesService.getUniversities(this.country, this.searchText)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(universities => {
          this.universities = universities
        });
    };
  };


  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  };

}
