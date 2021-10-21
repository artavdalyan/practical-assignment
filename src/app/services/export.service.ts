import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { ICsv } from '../interfaces';

const svgTemplate = (html: string) => `
 <svg xmlns='http://www.w3.org/2000/svg'>
        <foreignObject width='100%' height='100%'>
            <div xmlns='http://www.w3.org/1999/xhtml'>
                <style>
                  table {
                      font-weight: 400;
                      font-style: normal;
                      border-collapse: collapse;
                      width: 100%;
                      border-radius: 15px;
                   }
                   th {
                      font-size: 18px;
                      text-align: left;
                      padding: 20px 20px 20px 20px;
                    }
                  table,
                  td {
                    padding: 8px 8px 8px 20px;
                  }
                </style>
               ${html}
            </div>
            </foreignObject>
      </svg>
`;

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  exportAsCvs(fileName: string, data: ICsv[]): void {
    const csvArray = [Object.keys(data[0] ?? {}).join(',')];

    for (const row of data) {
      csvArray.push(Object.values(row).join(' ,'));
    }

    const blob = new Blob([csvArray.join('\r\n')], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);

    this.downloadFile(`${fileName}.csv`, url);
  }

  exportAsImage(fileName: string, html: string, canvas:HTMLCanvasElement ): void {
    if (canvas) {
      const ctx = canvas.getContext('2d');

      const svgBase64 = 'data:image/svg+xml;base64,' + btoa(svgTemplate(html));

      const img = new Image() as HTMLImageElement;
      img.onload = () => {
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }

        const url = canvas.toDataURL('image/jpg', 1);

        this.downloadFile(`${fileName}.jpg`, url);
      };
      img.src = svgBase64;
    }
  }

  private downloadFile(fileName: string, url: string): void {
    const a = this.document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    a.remove();
  }
}
