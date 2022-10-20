import {Component, Input, OnInit} from '@angular/core';
import {AnimeFromList} from "../models/AnimeFromList";

@Component({
  selector: 'app-card-poster',
  templateUrl: './card-poster.component.html',
  styleUrls: ['./card-poster.component.css']
})
export class CardPosterComponent implements OnInit {
  @Input() anime!: AnimeFromList;

  constructor() {}

  ngOnInit(): void {
  }

}
