import { EventEmitter, Injectable, Output } from '@angular/core';
import { EStorage } from '@enums/storage.enum';
import { IOptions } from '@interfaces/options.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  @Output() options: EventEmitter<IOptions> = new EventEmitter();
  @Output() masked: EventEmitter<boolean> = new EventEmitter();

  private defaultOptions: IOptions = { masked: false, intervalPrices: 5 };

  constructor(
    private storageService: StorageService
  ) { }

  getOptions(): IOptions {
    const options = this.storageService.get(EStorage.OPTIONS);
    return options || this.defaultOptions;
  }

  setMasked(masked: boolean): void {
    const options = this.getOptions();
    const updatedOptions = { ...options, masked };
    this.storageService.set(EStorage.OPTIONS, updatedOptions);
    this.populateOptions();
  }

  populateOptions(): void {
    const options = this.getOptions();
    this.masked.emit(options.masked);
    this.options.emit(options);
  }

}
