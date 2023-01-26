import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent {

  studentId:string|null|undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }
  genderList:Gender[]=[];

  constructor(private readonly studentService:StudentService,
    private readonly route:ActivatedRoute,
    private readonly genderService:GenderService,
    private snackbar:MatSnackBar,
    private router:Router){}
//
  ngOnInit():void{

    this.route.paramMap.subscribe(
      (params)=>{
        this.studentId=params.get('id');
        if(this.studentId){
          this.studentService.getStudent(this.studentId)
          .subscribe(
            (successResponse)=>{
             this.student=successResponse;
            }
          );

          this.genderService.getGenderList()
          .subscribe(
            (successResponse)=>{
              this.genderList=successResponse;
            }
          );
        }
      }
    );


  }
  onUpdate():void{
    //call studentService
    this.studentService.updateStudent(this.student.id,this.student)
    .subscribe(
      (successResponse)=>{
       this.snackbar.open('Student Updated Successfully',undefined,{
        duration:2000
       });

      },
      (errorResponse)=>{

      }
    );
  }
  onDelete():void{
    this.studentService.deleteStudent(this.student.id).subscribe(
      (successResponse)=>{
        this.snackbar.open('Student deleted successfully',undefined,{duration:2000});

        setTimeout(()=>{
          this.router.navigateByUrl('students');
        },2000);

      },
      (errorResponse)=>{

      }
    );
  }
}
