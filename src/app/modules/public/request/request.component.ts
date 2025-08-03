import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesService } from '@app/services/common/images.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { RequestService } from '@app/services/user/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent implements OnInit {

  public isLoading = signal(false);
  public form: FormGroup;
  public screenStage = signal(1);
  public clientSlug = signal('');
  public clientName = 'NossoQuintal'

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public imageService: ImagesService,
    private _formBuilder: FormBuilder,
    public snackbarService: SnackbarService,
    public requestService: RequestService
  ) {

    this.form = this._formBuilder.group(
      {
        name: [''],
        table: [''],
        music: ['', [Validators.required]],
      }
    )

  }


  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('id') ?? false;
    console.log(slug)
    if (slug !== this.clientName) {
      this.router.navigate([`/${this.clientName}`])
    }

    this.clientSlug.set(this.clientName)

    window.document.title = `Pede Musica - ${slug}`
  }

  public sendRequest() {

    if (!this.form.valid) {
      this.snackbarService.open('Qual música você quer ouvir?');
      return
    }

    this.isLoading.set(true);
    this.form.disable();

    const values = this.form.value;
    const data = {
      client_slug: this.clientSlug(),
      user_name: values.name,
      table: values.table,
      song_name: values.music
    }

    this.requestService.sendRequest(data).subscribe(
      response => {
        setTimeout(() => {
          this.screenStage.set(2)
        }, 2000)
      },
      excp => {
        this.isLoading.set(false);
        this.form.enable();
        this.snackbarService.open('Houve um erro inesperado ao solicitar a música');
      }
    )
  }

  public resetForm() {
    window.location.reload()
  }

}
