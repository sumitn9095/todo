// import { MatSnackBar } from "@angular/material/snack-bar";

export class CommonConstants {
    constructor(){
        
    }
    public static getUser(){
        return JSON.parse(sessionStorage.getItem('user') as any);
    }
    public static snack_bar_expiry: number = 4400;
    public static openSnackBar(message: string, action: string) {
        // this.snackbar.open(message, action, {
        //     duration: 4400,
        // });
    }
    public static capitalize = (str:string)=>{
      return str.slice(0,1).toUpperCase() + str.slice(1)
    }
    public static genColorForCategory = (str: string) => {
        let hash = 0;
        str.split('').forEach(char => {
          hash = char.charCodeAt(0) + ((hash << 5) - hash)
        })
        let colour = '#'
        for (let i = 0; i < 3; i++) {
          const value = (hash >> (i * 8)) & 0xff
          colour += value.toString(16).padStart(2, '0')
        }
        return colour
      }
}
