import { Injectable } from '@angular/core';
import { SeekableItem } from '../types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  keyFrames: SeekableItem[] = [
    {
      image: '../../assets/dog1.jpeg',
      timestamp: 3,
      show: false
    },
    {
      image: '../../assets/dog2.jpeg',
      timestamp: 5,
      show: false
    },
    {
      image: '../../assets/dog3.jpeg',
      timestamp: 8.5,
      show: false
    }
  ];
  

  videoUrl = '/assets/dog.mp4';
}
