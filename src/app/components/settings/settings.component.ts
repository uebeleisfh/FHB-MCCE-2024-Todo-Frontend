import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AwsConfig } from 'src/app/interfaces/aws-config/aws-config';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  awsConfig!: AwsConfig;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar    
  ) {}

  ngOnInit(): void {
    this.awsConfig = this.dataService.awsConfig;
  }

  async runConfigurationTest() {
    try {
      await this.dataService.healthcheck();
      this.showSnackBar("Connection to AWS Services works!", "success");
    } catch (err) {
      console.error(err);
      this.showSnackBar("Connection to AWS Services failed! Take a look at the error message for more details...", "error");
    }
  }

  showSnackBar(message: string, panelClass: string = "info") {
    this.snackBar.open(message, undefined, { duration: 5000, panelClass: [panelClass], verticalPosition: "bottom" });
  }

  saveConfiguration () {
    this.dataService.updateAwsConfig(this.awsConfig);

    localStorage.setItem("awsConfig", JSON.stringify(this.awsConfig));
    this.showSnackBar("AWS configuration has been updated and stored in Local Storage!", "success");
  }
}