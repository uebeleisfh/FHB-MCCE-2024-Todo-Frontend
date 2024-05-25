import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { AwsConfig } from 'src/app/interfaces/aws-config/aws-config';
import { TodoItem } from 'src/app/interfaces/todo-item/todo-item';

export interface AwsLambdaParams {
  FunctionName: string,
  InvocationType: string,
  LogType: string,
  Payload?: string
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  lambda!: AWS.Lambda;
  awsConfig: AwsConfig = {
    region: "",
    accessKeyId: "",
    secretAccessKey: "",
    sessionToken: ""
  };
  
  constructor() {
    let awsConfig = localStorage.getItem("awsConfig");

    if (awsConfig) {
      let config: AwsConfig = JSON.parse(awsConfig);
      this.updateAwsConfig(config);
    }
  }

  updateAwsConfig (config: AwsConfig) {
    this.awsConfig = config;
    AWS.config.update(<AWS.ConfigurationOptions> config);
    this.lambda = new AWS.Lambda();
  }

  getTodoItems (): Promise<any> {
    let params : AwsLambdaParams = {
      InvocationType: "RequestResponse",
      LogType: "None",
      FunctionName: "arn:aws:lambda:us-east-1:344646043511:function:getTodoItems"
    }

    let response: Promise<any> = this.callLambda(params); 
    return response;
  }

  updateTodoItem (item: TodoItem): Promise<any> {
    let params : AwsLambdaParams = {
      InvocationType: "RequestResponse",
      LogType: "None",
      FunctionName: "arn:aws:lambda:us-east-1:344646043511:function:updateItem",
      Payload: JSON.stringify(item)
    }

    let response: Promise<any> = this.callLambda(params); 
    return response;
  }

  deleteTodoItem (item: TodoItem): Promise<any> {
    let params : AwsLambdaParams = {
      InvocationType: "RequestResponse",
      LogType: "None",
      FunctionName: "arn:aws:lambda:us-east-1:344646043511:function:deleteItem",
      Payload: JSON.stringify(item)
    }

    let response: Promise<any> = this.callLambda(params); 
    return response;
  }

  callLambda(params: AwsLambdaParams): Promise<any> {
    return new Promise((resolve, reject) => {
      this.lambda.invoke(params, function(err, data) {
        if (err) {
          reject(err);
        }
        else {
          let payload = JSON.parse(<string>data.Payload)
          resolve(payload);
        }   
      });
    })
  }

  healthcheck() { 
    let params = {
      FunctionName: 'arn:aws:lambda:us-east-1:344646043511:function:HelloWorld',
      InvocationType: "RequestResponse",
      LogType: "None",
      Payload: JSON.stringify({
        "key1": "value1",
        "key2": "value2",
        "key3": "value3"
      }),
    };

    return this.callLambda(params);
  }
}
