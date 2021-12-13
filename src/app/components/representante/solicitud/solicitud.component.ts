import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  solicitud: any;
  constructor(
    public dialogRef: MatDialogRef<SolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {solicitudIndividual: any},
    private solicitudService: SolicitudService,
  ) { }

  ngOnInit(): void {
    
  }

  cancelar() {
    this.dialogRef.close();
  }

  







}
