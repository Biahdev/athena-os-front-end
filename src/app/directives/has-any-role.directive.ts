import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Directive({
    selector: '[appHasAnyRole]',
    standalone: true
})

export class HasAnyRoleDirective implements OnInit {
    @Input() appHasAnyRole!: string[]; // Lista de roles permitidas

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.checkRoles();
    }

    private checkRoles() {
        const hasAnyRole = this.authService.hasAnyRole(this.appHasAnyRole);

        if (hasAnyRole) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
