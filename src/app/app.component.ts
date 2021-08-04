import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import listCity from './../assets/city.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  keyword = 'name';
  data: any;
  minus: any;
  weather: any
  listToday: any
  state: any
  myDate = new Date();
  nextDay = 1627963200;
  listWeather: any;
  city: any;
  icon: any;


  constructor(
    private HttpClient: HttpClient,
  ) {
  }

  public arrUnique() {
    let concatArray = listCity.map(eachValue => {
      return Object.values(eachValue.name).join('')
    })
    let filterValues = listCity.filter((_value, index) => {
      return concatArray.indexOf(concatArray[index]) === index
  
    })
    filterValues.forEach((e: any) => {
      e.lat = e.coord?.lat
      e.lon = e.coord?.lon
      delete e.coord
      delete e.country
      delete e.state
    });
    return filterValues
  }

  public getData(res: any) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${res.lat}&lon=${res.lon}&exclude=current,minutely,hourly&appid=d39222486639f9f84208748ec9cb141d`
    let result = []
    this.HttpClient.get<any>(url)
      .subscribe((data) => {
        this.weather = data.daily[0]
        result = data.daily.filter((_d: number, index: number) => { return index !== 0 })
        this.listWeather = result
      },
        _error => {
        }
      );
  }

  public getCountry() {
    const url = 'http://ip-api.com/json'
    this.HttpClient.get<any>(url)
      .subscribe((data) => {
        this.state = data
        this.getData(data)
      },
        _error => {
        }
      );
  }

  ngOnInit(): void {
    this.getCountry()
    this.listToday = ['morning', 'day', 'evening', 'night']
    this.minus = 273.15
    this.city = this.arrUnique()
  }

  selectEvent(item: any) {
    const obj = {
      city: item.name,
      country: 'Indonesia'
    }
    this.state = obj
    this.getData(item)
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }

}

