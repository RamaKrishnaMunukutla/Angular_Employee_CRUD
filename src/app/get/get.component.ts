import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {   FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
  employeeform
  users: Object;
  postData={
  test:'mycontent'
  }
  json;
  pages: any = 5;
  add_button: boolean = true;
	update_button: boolean = false;
  url="http://192.168.2.128:9898/employee/createEmployee";
  
 

  constructor(private fb: FormBuilder,private http:HttpClient) {
   
   
    // this.http.post(this.url,this.postData).toPromise().then((data:any)=>{
    //   console.log(data);
    //   this.json=data.json;
    // })
    this.getallemployee()

   }
 
  ngOnInit(): void {
  // this.getemployeee();
  //  console.log(this.getemployeee())
  this.employeeform = this.fb.group({
		
    id: ['', [Validators.required]],
    ename: ['', [Validators.required,Validators.maxLength(6)]],
    salary: ['', Validators.required],
    city: ['', Validators.required],
    number:['',[Validators.required, Validators.minLength(6)]]
  });
  // this.getallemployee();
}


// getemployeee(){
 
//   console.log(this.employeeform.value)
// }
getallemployee(){
    this.http.get('http://192.168.2.128:9898/employee/findAllEmployees').subscribe(res=>
      {
        this.users = res["body"]["listofEmployees"];
       
        console.log(res,"dddd")
    });
}
getemployeee() {
  this.http.post(this.url, {
    
    "employeeId":  this.employeeform.value.id,
	"employeeName":  this.employeeform.value.ename,
	"employeeSalary":  this.employeeform.value.salary,
	"employeeCity":  this.employeeform.value.city,
	"employeePhoneNumber":  this.employeeform.value.number
  }).toPromise().then((response: any) => {
    if ( response.body.statusCode === "200") {
      
      this.getallemployee();
      alert("added successfully");
     
    }
  })
   

}
editemployee(user) {
    this.add_button = false;
		this.update_button = true;
		console.log('patient data')
	


 
		this.employeeform.patchValue({

     
      id: user.employeeId,
      ename:user.employeeName,
      salary:user.employeeSalary,
      city: user.employeeCity,
      number:user.employeePhoneNumber
		});

	
  }
  updateAllergyList(vale: any) {
	
		this.http.put("http://192.168.2.128:9898/employee/updateEmployee/779",
			{
			
        "employeeId": vale.value.id,
        "employeeName": vale.value.ename,
        "employeeSalary":vale.value.salary,
        "employeeCity":vale.value.city,
        "employeePhoneNumber": vale.value.number,
      

			}).toPromise().then((response: any) => {
				if (response.body.statusCode == "200") {
					this.getallemployee();
				alert("Updated Successfully")

					
					this.add_button = true;
					this.update_button = false;
				}
			}).catch((err: any) => {
				console.log('\n err...', err);
			alert('Sorry. Something went wrong.', );
			});
	}
  deleteemp(user){
this.http.delete( `http://192.168.2.128:9898/employee/deleteEmployeeById/${user.employeeId}`).subscribe(response=>{
  this.getallemployee();
  alert("Deleted Successfully")
})
  }
  // getpagination(){
  //   this.http.get('http://192.168.2.128:9898/employee/getEmployeeByPagination/0/2').subscribe(res=>
  //     {
  //       this.users = res["body"]["listofEmployees"];
       
  //       console.log(res,"dddd")
  //   });
  // }

  get f() { return this.employeeform.controls; }


  }


