import { Component, trigger, state, style, transition, animate, Input, Output, EventEmitter } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { view } from '../view';
import { Menu } from '../menu';
import { menus } from '../routing'

@Component({
    selector: 'menu',
    templateUrl: view('components/menu.html')
})
export class MenuComponent {

    private active : Menu;     
    private completeMenu : Menu[];
    public breadcrumb : Menu[]; 
    public currentMenu : Menu[]; 

    constructor(private router: Router){
        this.breadcrumb = [];
        this.completeMenu = menus;
        this.currentMenu = this.completeMenu;
    }

    public itemClick(menu : Menu, index : number) : void {
        if(menu.action['path'] === undefined){
            this.breadcrumb.push(menu);
            this.currentMenu = (<Menu[]>(menu).action);
        }
        else{
            this.active = menu;
            this.router.navigate(['/'+(<Route>menu.action).path]);
        }
    }

    public isActive(item: Menu): boolean {
        return (item == this.active);
    }

    public breadcrumbClick(position : number): void {
        if(position){
            this.currentMenu = <Menu[]>this.breadcrumb[position].action;
        }
        else{
            this.currentMenu = this.completeMenu;
        }
    }

    public getTitleMenu(item: Menu): string {
        return item.title;
    }
}