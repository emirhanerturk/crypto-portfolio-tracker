import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin } from '@models/coin.model';
import { CoinsStore } from '@stores/coins.store';

@Component({
  selector: 'app-autocomplete-coins',
  templateUrl: './autocomplete-coins.component.html',
  styleUrls: ['./autocomplete-coins.component.scss']
})
export class AutocompleteCoinsComponent implements OnInit {

  @Input() value: string = null;
  @Input() placeholder = '';
  @Output() changed: EventEmitter<Coin> = new EventEmitter();

  opened = false;
  data: Coin[] = [];
  list: Coin[] = [];
  model = '';
  selected: Coin = null;

  constructor(
    private coinStore: CoinsStore,
  ) { }

  ngOnInit(): void {

    this.list = this.data;

    this.setSelected();

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.data && !changes.data.firstChange){
      this.list = this.data;
      this.model = '';
      this.setSelected();
    }

    if (changes.value && !changes.value.firstChange){
      this.setSelected();
    }

  }

  setSelected(): void {

    this.selected = this.data.find(item => item.id === this.value);

  }

  toggle(forceClose?: boolean): void {

    if (this.opened || forceClose){

      this.opened = false;
      if (this.selected){
        this.model = `${this.selected.symbol.toUpperCase()} - ${this.selected.name}`;
      }

    } else {
      this.opened = true;
    }

  }

  search(key: string): void {

    this.model = key;
    key = key.trim().toLowerCase();

    if (key && key.length > 2) {

      const filteredList = this.coinStore.searchCoins(key);

      this.list = filteredList;

    } else {
      this.list = this.data;
    }

  }

  select(item: Coin): void {

    this.selected = item;
    this.changed.emit(this.selected);

  }

  clear(): void {
    this.select(null);
  }

}
