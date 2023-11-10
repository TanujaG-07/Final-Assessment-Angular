import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TableDataService } from '../table-data.service';
import { UserData } from './tableData';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit {

  constructor(private tableService:TableDataService) { }

  ngOnInit(): void {
    this.tableService.getTableData().subscribe(response =>{
      this.dataToShow1 = response;
      this.dataToShow = JSON.parse(JSON.stringify(this.dataToShow1))
      this.searchData = this.dataToShow
     })
  }
  showSearch = true;
  searchText: string ='' ;
  searchData: any[] =[];

  @Input() dataSource: any;
  @Input() footerButtons:any
  @Input() openModal:any;
  @Input() dataToShow1:any
  isSorted = false;
  dataToShow = [];

  
  sortOut(str:string) {
    this.isSorted = !this.isSorted
    const [...sortedData]  = this.dataToShow;
    if(str.includes('id')) { 
          this.isSorted ? sortedData.sort((a,b)=>{return b['id'] - a['id'];}) : 
          sortedData.sort((a,b)=>{return a['id'] - b['id'];})
    } else if(str.includes('title')) {
          this.isSorted ? sortedData.sort((a:UserData,b:UserData)=>{ return a['title'].localeCompare(b['title']);}) : 
          sortedData.sort((a:UserData,b:UserData)=>{ return b['title'].localeCompare(a['title']); })
    }
    this.searchData = [...sortedData]
  }
  
  filterData() {
    this.searchData = this.dataToShow.filter((item :UserData) => {
      console.log(this.searchText === item['title'])
      return item['title'].toLowerCase().includes(this.searchText.toLowerCase()) ;
    } 
    );
  }

  clearSort() {
    this.searchData = [...this.dataToShow];
    console.log(this.searchData)
  }
  
 }
