import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { to64decode } from 'src/app/helpers/base64';
import { IChild, IInfo } from 'src/app/interfaces/page/IInfo';
import { IUser } from 'src/app/interfaces/user/IUser';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  me: IUser
  cachedImageUser: string;
  menuArray!: IChild[]
  infoArray!: IInfo[]

  constructor(private cookieService: CookieService,
    private router: Router
  ){
    this.me = to64decode(this.cookieService.get('me'))
    this.cachedImageUser = `data:image/png;base64,${localStorage.getItem('cachedImage')}`
    this.getPageArrays()
  }

  ngOnInit(){
    
  }

  getPageArrays(){
    this.menuArray = [
      { name: 'Suas viagens', url: 'your_trips'}, 
      { name: 'Reservar viagens', url: 'reserve_trips'}, 
      { name: 'Astronautas', url: 'astronauts'}, 
      { name: 'Foguetes', url: 'rockets'}, 
      { name: 'Missões', url: 'missions'}, 
      { name: 'Administradores', url: 'administrators'}, 
    ]

    this.infoArray = [
      {
        name: 'Mais sobre o mundo espacial',
        icon: 'fa-satellite',
        children: [
          {
            name: 'Nasa',
            url: 'https://www.nasa.gov'
          },
          {
            name: 'Missões Apollo',
            url: 'https://canaltech.com.br/espaco/da-apollo-1-a-apollo-17-o-que-fez-cada-missao-do-programa-lunar-da-nasa-154105/'
          }
        ]
      },
      {
        name: 'Filmes recomendados',
        icon: 'fa-film',
        children: [
          {
            name: 'Apollo 11',
            url: 'https://www.google.com/search?q=filme+apollo+11&client=opera-gx&hs=SUC&sca_esv=d7773eb477db942c&sxsrf=ADLYWILQbke6dXyGfnlggbhvdrTf-_8ktw%3A1715197985863&ei=Idg7ZtCjNLne1sQP1YyeqA8&ved=0ahUKEwiQuKq16v6FAxU5r5UCHVWGB_UQ4dUDCBA&uact=5&oq=filme+apollo+11&gs_lp=Egxnd3Mtd2l6LXNlcnAiD2ZpbG1lIGFwb2xsbyAxMTIIEC4YgAQY1AIyCBAuGIAEGNQCMgYQABgHGB4yBhAAGB4YDzIGEAAYBRgeMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMhcQLhiABBjUAhiXBRjcBBjeBBjgBNgBAkj2GlAAWPYXcAB4AZABAJgBmwGgAfkPqgEEMC4xNbgBA8gBAPgBAZgCDKACgQ3CAg8QIxiABBgnGIoFGEYY_wHCAgQQIxgnwgIKEAAYgAQYQxiKBcICDRAuGIAEGEMY1AIYigXCAgsQLhiABBixAxiDAcICFhAuGIAEGLEDGNEDGEMYgwEYxwEYigXCAgsQABiABBixAxiDAcICDhAuGIAEGLEDGNEDGMcBwgIOEC4YgAQYsQMYgwEYigXCAhkQABiABBiKBRhGGP8BGJcFGIwFGN0E2AEBwgIFEAAYgATCAg0QABiABBixAxhDGIoFwgIQEC4YgAQYsQMYQxiDARiKBcICEBAuGIAEGLEDGEMY1AIYigXCAggQABiABBixA8ICChAuGIAEGEMYigXCAggQLhiABBixA8ICBRAuGIAEwgILEC4YgAQYxwEYrwHCAgoQABiABBixAxgNwgIHEC4YgAQYDcICDRAuGIAEGMcBGA0YrwHCAgcQABiABBgNmAMAugYGCAEQARgTugYGCAIQARgUkgcEMC4xMqAH_6gB&sclient=gws-wiz-serp'
          },
          {
            name: 'For All Mankind',
            url: 'https://www.google.com/search?q=filme+For+All+Mankind&client=opera-gx&hs=Mpr&sca_esv=d7773eb477db942c&sxsrf=ADLYWIJhhxTGbbFcqrR2GBj1GbG8tKSRmw%3A1715198003222&ei=M9g7ZqeCDZjV1sQPx4mPwAU&udm=&ved=0ahUKEwjn58296v6FAxWYqpUCHcfEA1gQ4dUDCBA&uact=5&oq=filme+For+All+Mankind&gs_lp=Egxnd3Mtd2l6LXNlcnAiFWZpbG1lIEZvciBBbGwgTWFua2luZDIFEAAYgAQyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRI1AVQYFhgcAF4AZABAJgBjAGgAYwBqgEDMC4xuAEDyAEA-AEC-AEBmAICoAKTAcICChAAGLADGNYEGEfCAhMQLhiABBiwAxhDGMgDGIoF2AEBwgIVEC4YgAQYsAMYQxjIAxiKBRgK2AEBwgIYEC4YgAQYsAMYQxjUAhjIAxiKBRgK2AEBmAMAiAYBkAYNugYECAEYCJIHAzEuMaAHtgI&sclient=gws-wiz-serp'
          },
          {
            name: 'The Last Man on the Moon',
            url: 'https://www.google.com/search?q=filme+The+Last+Man+on+the+Moon&client=opera-gx&hs=GAX&sca_esv=d7773eb477db942c&sxsrf=ADLYWII5H_73TEkvQ7shH5GyMB8ipjNdxg%3A1715198016607&ei=QNg7ZszTJLvd1sQPx6eWgAg&udm=&ved=0ahUKEwjM8_7D6v6FAxW7rpUCHceTBYAQ4dUDCBA&uact=5&oq=filme+The+Last+Man+on+the+Moon&gs_lp=Egxnd3Mtd2l6LXNlcnAiHmZpbG1lIFRoZSBMYXN0IE1hbiBvbiB0aGUgTW9vbjIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBEjQEVA8WLEKcAF4AZABAJgBlwGgAaQDqgEDMC4zuAEDyAEA-AEC-AEBmAIDoAKzAsICChAAGLADGNYEGEfCAgYQABgNGB6YAwCIBgGQBgiSBwMxLjKgB6MK&sclient=gws-wiz-serp'
          },
          {
            name: 'Apollo 13',
            url: 'https://www.google.com/search?q=filme+Apollo+13&client=opera-gx&hs=qpr&sca_esv=d7773eb477db942c&sxsrf=ADLYWIIHbqFfhI4nuI-STCtxnAWF4XTI7w%3A1715198033188&ei=Udg7ZoKOC6bL1sQPhe2quAE&udm=&ved=0ahUKEwjC-vLL6v6FAxWmpZUCHYW2ChcQ4dUDCBA&uact=5&oq=filme+Apollo+13&gs_lp=Egxnd3Mtd2l6LXNlcnAiD2ZpbG1lIEFwb2xsbyAxMzIFEC4YgAQyBRAAGIAEMgUQABiABDIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yCBAAGIAEGKIEMggQABiABBiiBDIUEC4YgAQYlwUY3AQY3gQY4ATYAQFIgwRQAFgAcAB4AZABAJgBmQGgAZkBqgEDMC4xuAEDyAEA-AEC-AEBmAIBoAKgAZgDALoGBggBEAEYFJIHAzAuMaAH4Qc&sclient=gws-wiz-serp'
          },
          {
            name: 'First Man',
            url: 'https://www.google.com/search?q=filme+First+Man&client=opera-gx&hs=kAX&sca_esv=d7773eb477db942c&sxsrf=ADLYWIIREO_dUtL4Hl158JZo5XdYzWe49A%3A1715198046979&ei=Xtg7ZqayO6rU1sQPqZCHgAQ&udm=&ved=0ahUKEwim2bzS6v6FAxUqqpUCHSnIAUAQ4dUDCBA&uact=5&oq=filme+First+Man&gs_lp=Egxnd3Mtd2l6LXNlcnAiD2ZpbG1lIEZpcnN0IE1hbjIFEC4YgAQyCBAAGIAEGKIEMggQABiABBiiBDIUEC4YgAQYlwUY3AQY3gQY4ATYAQNIqAZQNVg1cAF4AZABAJgBkAGgAZABqgEDMC4xuAEDyAEA-AEC-AEBmAICoAKZAcICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFwgIOEAAYsAMY5AIY1gTYAQHCAhMQLhiABBiwAxhDGMgDGIoF2AECmAMAiAYBkAYRugYGCAEQARgJugYGCAIQARgIugYGCAMQARgUkgcDMS4xoAfdBA&sclient=gws-wiz-serp'
          }
        ]
      },
      {
        name: 'Livros recomendados',
        icon: 'fa-book',
        children: [
          {
            name: 'Lost Moon: The Perilous Voyage of Apollo 13',
            url: 'https://www.google.com/search?q=livro+lost+moon%3A+the+perilous+voyage+of+apollo+13&client=opera-gx&hs=8TC&sca_esv=d7773eb477db942c&sxsrf=ADLYWIJA7BKhCd4aGu3oQLzA46IDOgnR1A%3A1715197965015&ei=Ddg7Zrs8j83WxA-A-bWwDw&udm=&ved=0ahUKEwj79rGr6v6FAxWPppUCHYB8DfYQ4dUDCBA&uact=5&oq=livro+lost+moon%3A+the+perilous+voyage+of+apollo+13&gs_lp=Egxnd3Mtd2l6LXNlcnAiMWxpdnJvIGxvc3QgbW9vbjogdGhlIHBlcmlsb3VzIHZveWFnZSBvZiBhcG9sbG8gMTMyCBAhGKABGMMESKRzULVrWL1wcAJ4AZABAJgBpwGgAYEHqgEDMC42uAEDyAEA-AEBmAIFoALCA8ICChAAGLADGNYEGEfCAgcQIxiwAhgnwgIJEC4YgAQYExgNwgIJEAAYgAQYExgNwgIIEAAYgAQYogTCAgoQIRigARjDBBgKmAMAiAYBkAYIkgcDMi4zoAffJg&sclient=gws-wiz-serp'
          },
          {
            name: 'A Man on the Moon: The Voyages of the Apollo Astronauts',
            url: 'https://www.google.com/search?q=livro+A+Man+on+the+Moon%3A+The+Voyages+of+the+Apollo+Astronauts&client=opera-gx&hs=LTC&sca_esv=d7773eb477db942c&sxsrf=ADLYWIKphGHurXr4kV7ztWFG_VgIbHSKVg%3A1715197916039&ei=3Nc7ZrfpAfHY1sQPur-VgAk&udm=&ved=0ahUKEwi3x4SU6v6FAxVxrJUCHbpfBZAQ4dUDCBA&uact=5&oq=livro+A+Man+on+the+Moon%3A+The+Voyages+of+the+Apollo+Astronauts&gs_lp=Egxnd3Mtd2l6LXNlcnAiPWxpdnJvIEEgTWFuIG9uIHRoZSBNb29uOiBUaGUgVm95YWdlcyBvZiB0aGUgQXBvbGxvIEFzdHJvbmF1dHMyCBAAGIAEGKIEMggQABiABBiiBEjnEFAAWPMLcAB4AZABAJgBkgGgAZIBqgEDMC4xuAEDyAEA-AEB-AECmAIBoAKTAZgDAOIDBRIBMSBAkgcDMC4xoAfgAQ&sclient=gws-wiz-serp'
          },
          {
            name: "Rocket Men: The Daring Odyssey of Apollo 8 and the Astronauts Who Made Man's First Journey to the Moon",
            url: 'https://www.google.com/search?q=livro+Rocket+Men%3A+The+Daring+Odyssey+of+Apollo+8+and+the+Astronauts+Who+Made+Man%27s+First+Journey+to+the+Moon&client=opera-gx&hs=Smr&sca_esv=d7773eb477db942c&sxsrf=ADLYWIJ6RjUOSuUfb1Ucod-p3seMN3emLQ%3A1715197823545&ei=f9c7ZpHgIJbO1sQP97O2-Ac&udm=&ved=0ahUKEwjRm_fn6f6FAxUWp5UCHfeZDX8Q4dUDCBA&uact=5&oq=livro+Rocket+Men%3A+The+Daring+Odyssey+of+Apollo+8+and+the+Astronauts+Who+Made+Man%27s+First+Journey+to+the+Moon&gs_lp=Egxnd3Mtd2l6LXNlcnAibGxpdnJvIFJvY2tldCBNZW46IFRoZSBEYXJpbmcgT2R5c3NleSBvZiBBcG9sbG8gOCBhbmQgdGhlIEFzdHJvbmF1dHMgV2hvIE1hZGUgTWFuJ3MgRmlyc3QgSm91cm5leSB0byB0aGUgTW9vbki0BlBAWEBwAXgAkAEAmAFroAFrqgEDMC4xuAEDyAEA-AEC-AEBmAIAoAIAmAMAiAYBkgcAoAezAQ&sclient=gws-wiz-serp'
          }
        ]
      }
    ]
  }

  navigate(url: string){
    this.router.navigate([url])
  }

  redirectToExternalLink(url: string){
    window.open(url, '_blank');  
  }
  
  getAccess(url: string): boolean{
    switch (this.me.type_user) {
      case 'astronaut':
        return !['administrators', 'astronauts', 'rockets', 'missions'].includes(url)    
      case 'administrator':
        return !['your_trips', 'administrators', 'reserve_trips'].includes(url) 
      case 'houston':
        return !['your_trips', 'reserve_trips'].includes(url) 
      default:
        return false
    }
  }
}
