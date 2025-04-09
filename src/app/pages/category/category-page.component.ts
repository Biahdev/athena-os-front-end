import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";
import {CustomizerSettingsService} from '../../customizer-settings/customizer-settings.service';
import {CategoryCreateDialog} from "./create/category-create-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../types/Category";
import {CategoryDeleteDialog} from "./delete/category-delete-dialog.component";
import {CategoryEditDialog} from "./edit/category-edit-dialog.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {CategoryWithCountProduct} from "../../types/CategoryWithCountProduct";

@Component({
    imports: [
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatIcon,
        MatSort,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        CommonModule,
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatCardSubtitle,
        MatCardTitle,
    ],
    selector: 'app-category-list',
    standalone: true,
    styleUrl: './category-page.component.scss',
    templateUrl: './category-page.component.html',
})
export class CategoryPageComponent {
    displayedColumns: string[] = ['name', 'qtdProduct', 'action'];
    dataSource = new MatTableDataSource<CategoryWithCountProduct>([]);

    error: boolean = false;
    errorMessage: string;
    success: boolean = false;
    successMessage: string;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public themeService: CustomizerSettingsService,
        public dialog: MatDialog,
        private categoryService: CategoryService,
    ) {
    }

    ngOnInit(): void {
        this.categoryService.getAllWithCountProduct().subscribe(data => {
            this.dataSource.data = data;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openCategoryCreateDialog(): void {
        const dialogRef = this.dialog.open(CategoryCreateDialog, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe((result: CategoryWithCountProduct) => {
            if(result) {
                result.productCount = result.productCount == null ? 0 : result.productCount;
                this.dataSource.data.push(result);
                this.successAlert(`Categoria '${result.name}' criada com sucesso`);
            } else if(result != undefined) {
                this.errorAlert('Erro ao criar  uma categoria');
            }
        });
    }

    openCategoryEditDialog(category: CategoryWithCountProduct): void {
        const dialogRef = this.dialog.open(CategoryEditDialog, {
            data: {categoryId: category.categoryId, name: category.name, status: category.status},
            width: '400px',
        });

        dialogRef.afterClosed().subscribe((result: CategoryWithCountProduct) => {
            if(result) {
                const index = this.dataSource.data.findIndex(c => c.categoryId === result.categoryId);
                if(index !== -1) {
                    this.dataSource.data[index] = result;
                    this.dataSource.data = [...this.dataSource.data];
                    this.successAlert(`Categoria '${category.name}' editada com sucesso`);
                }
            } else if(result != undefined) {
                this.errorAlert('Erro ao editar categoria');
            }
        });
    }

    openCategoryDeleteDialog(category: Category): void {
        const dialogRef = this.dialog.open(CategoryDeleteDialog, {
            data: {categoryId: category.categoryId, name: category.name},
            width: '400px',
        });

        dialogRef.afterClosed().subscribe((result: string) => {
            if(result === 'deleted') {
                this.dataSource.data = this.dataSource.data.filter(item => item.categoryId !== category.categoryId);
                this.successAlert(`Categoria '${category.name}' deletado com sucesso`);
            } else if(result != undefined) {
                this.errorAlert('Erro ao deletar categoria');
            }
        });
    }

    dismissAlert(type: string) {
        if(type == 'sucess') {
            this.success = false;
        } else {
            this.error = false;
        }
    }

    successAlert(msg: string) {
        this.successMessage = msg;
        this.success = true;
        setTimeout(() => this.success = false, 10000);
    }

    errorAlert(msg: string) {
        this.errorMessage = msg;
        this.error = true;
        setTimeout(() => this.error = false, 10000);
    }
}
