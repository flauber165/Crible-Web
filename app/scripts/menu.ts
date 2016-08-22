import { Route } from '@angular/router';

export type Menu = { 
    title : string, 
    checkPermission: ((permissions: string[]) => boolean) | boolean,
    action: Menu[] | Route,
    visible?: boolean 
}

