import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken } from 'src/app/my-model/my-model.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  submitted = false;
  data: any;
  url: any[] = [];
  images: any[] = [];
  imageSrc: string | undefined;
  imageFile: any;
  pdf: any;
  fullname: any;
  id: any;
  constructor(
    private router: Router,
    private service: ServiceService,
    private toastr: ToastrService,
    // private helper: JwtHelperService
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = this.service.getUser();
    this.fullname = decodedToken.fullName;
    this.id = decodedToken.id;
  }

  ngOnInit(): void {}

  onBookSelect(event: any) {
    this.pdf = event.target.files[0];
  }

  onImageSelect(event: any) {
    this.imageFile = event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }

  // selectimage1(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.imageFile = event.target.files[0];
  //     this.images.push(this.imageFile);
  //     console.log(this.imageFile);
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload = (event: any) => {
  //       this.url.push(event.target.result);
  //     };
  //   }
  // }

  // onFileChange(event: any) {
  //   const reader = new FileReader();

  //   if (event.target.files && event.target.files[0]) {
  //     const [file] = event.target.files;

  //     this.pdf = event.target.files[0];
  //     console.log(this.pdf);
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       this.imageSrc = reader.result as string;

  //       this.form.patchValue({
  //         fileSource: reader.result,
  //       });
  //     };
  //   }
  // }

  title: any;
  author: any;
  year: any;
  selling: any;
  description: any;
  book: any;
  image: any;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('',
     [Validators.required,
      ]),
    year: new FormControl('', [Validators.required]),
    selling: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    book: new FormControl('', [Validators.required]),
  });

  submit() {
    const values = this.form.value;
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('year', values.year);
    formData.append('selling', values.selling);
    formData.append('image', this.imageFile);
    formData.append('book', this.pdf);
    formData.append('description', values.description);

    // console.log(formData);

    this.service.createBook(formData).subscribe(
      (res) => {
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
        this.toastr.error('Not Successfully to Create', 'Error');
      }
    );
  }
}
