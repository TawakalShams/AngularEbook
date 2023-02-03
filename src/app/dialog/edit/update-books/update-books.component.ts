import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-update-books',
  templateUrl: './update-books.component.html',
  styleUrls: ['./update-books.component.css']
})
export class UpdateBooksComponent implements OnInit {

  submitted = false;
  data:any;
  url: any[] = [];
  images: any[] = [];
  imageSrc: string | undefined;

  constructor(
    private router: Router,
    private service: ServiceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dataa: any,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<UpdateBooksComponent>,
    ) { }

  ngOnInit(): void {
    this.viewSingleProduct();
  }
  viewSingleProduct() {
    this.service
      .getByIdBook(this.dataa.id)
      .subscribe((data: any) => {
        this.form.controls.title.setValue(this.dataa.title);
        this.form.controls.author.setValue(this.dataa.author);
        this.form.controls.year.setValue(this.dataa.year);
        this.form.controls.selling.setValue(this.dataa.selling);
        this.form.controls.description.setValue(this.dataa.description);
        this.form.controls.book.setValue(this.dataa.book);
        this.form.controls.image.setValue(this.dataa.image);
        // this.imageSrc = this.dataa.image;

        this.form.updateValueAndValidity();
      });
  }
  selectimage1(event: any) {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      this.images.push(imageFile);

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url.push(event.target.result);
      };
    }
  }
  title:any;
  author:any;
  year:any;
  seling:any;
  description:any;
  book:any;
  image:any;

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
    ]),
    author: new FormControl('', [
      Validators.required,
    ]),
    year: new FormControl('', [
      Validators.required,
    ]),
    selling: new FormControl('', [
      Validators.required,
    ]),
    image: new FormControl('',
     [Validators.required]),
     description: new FormControl('', [
      Validators.required,
    ]),
    book: new FormControl('', [
      Validators.required,
    ]),
  });
  onFileChange(event:any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.form.patchValue({
          fileSource: reader.result
        });

      };

    }
  }

  submit(){
    console.log(this.form.value)

    // const formData = new FormData();
    // this.image.forEach((image:any) => {
    //   formData.append('files[]', image);
    // });
    // this.book.forEach((book:any) => {
    //   formData.append('files[]', book);
    // });


    this.service.createBook(this.form.value).subscribe(
      (res) => {
        console.log(res)
        this.submitted = true;
        this.toastr.success('Successfully to Create', 'Successfully');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['addbook']);
          });
      },
      (error) => {
        console.log(error);
        this.toastr.error(
          'Not Successfully to Create',
          'Error'
        );
      }
    );
  }
}
