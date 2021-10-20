import { Injectable } from '@angular/core';
import { ICsv } from "../interfaces";

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor() {}

  exportAsCvs(fileName: string, data: ICsv[]){
    let  csvArray = [Object.keys(data[0]).join(',')];
    for(const row of data){
      csvArray.push(Object.values(row).join(' ,'))
    }
    this.downloadFile(fileName, csvArray)
  }

  downloadFile(fileName: string, csvArray: string[]){
    const a = document.createElement('a');
    const blob = new Blob([csvArray.join('\r\n')], { type: 'image/jpg' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = `${fileName}.jpg`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }


  domToCanvas(html: string){
    debugger;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if(canvas){
      const ctx = canvas.getContext("2d");
      const svgTemplate = `
      <svg xmlns='http://www.w3.org/2000/svg'>
        <foreignObject width='100%' height='100%'>
            <div xmlns='http://www.w3.org/1999/xhtml'>
                ${html}
            </div>
            </foreignObject>
      </svg>`;

      const DOMURL = self.URL || self.webkitURL || self;
      const img = new Image() as HTMLImageElement;
      const svg = new Blob([svgTemplate], {type: "image/svg+xml;charset=utf-8"});
      const url = DOMURL.createObjectURL(svg);
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = function() {
        if(ctx) {
          ctx.drawImage(img, 0, 0);
          DOMURL.revokeObjectURL(url);
            (window as any).location = (document.getElementById("canvas") as HTMLCanvasElement)!.toDataURL();

        }

      };
      img.src = url;
    }

  }
}
