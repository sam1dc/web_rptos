import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-producto-en-web',
  templateUrl: './lista-producto-en-web.component.html',
  styleUrls: ['./lista-producto-en-web.component.css']
})
export class ListaProductoEnWebComponent implements OnInit, OnDestroy {

  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Control Productos En Web',
        link: './control-productos-en-web',
        index: 0
      }, 
      {
        label: 'Control Ventas Web',
        link: './control-ventas-web',
        index: 1
      },
    ];
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  ngOnDestroy(): void {
  }

}
