import { Component, OnInit } from '@angular/core';
// import { TestService, Info_service} from '../test.service';
import{ SharedService, listing_service } from 'src/app/shared.service';
// import {ListingtestService, listing_service} from '../listingtest.service';
// import { Component, OnInit } from '@angular/core';
import { TestService} from '../test.service';
import { RouterModule, Routes, Router } from '@angular/router';

// import {ListingtestService, listing_service} from '../listingtest.service';
// import{ SharedService, listing_service } from 'src/app/shared.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  
  info : listing_service = { ListingId: 1,
    Title: "string",
    Category: "string",
    Description: "string",
    Rating: 1,
    Thumbnail: "string",
    Img_one: "string",    
    Img_two: "string",
    Img_three: "string",
  };
    
  // constructor(private test_service: SharedService) { }
  constructor (private service:SharedService, private RandomUser:SharedService , private test_service: SharedService, private router: Router){}

  Listinginfo:any = [];
  Thumbnail:string ="";
  ThumbnailPath:string="";
  Path_Thumbnail:string="assets\\Cards\\";

  ngOnInit(): void {
    this.info = this.test_service.get_info();
    this.refreshListing();
  }

  refreshListing(){
    this.service.getListing().subscribe(data => {
      this.Listinginfo=data;
    });
  }

  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.Thumbnail=data.toString();
      this.ThumbnailPath=this.service.ThumbnailUrl+this.Thumbnail;
    })
  }

  send_info() {
    // console.log(test)
    // this.test_service.set_extra(test)
    this.router.navigate(['../Bookslot'])
  }
  // ngOnInit(): void {
  //   this.info = this.test_service.get_info();
  // }


}


