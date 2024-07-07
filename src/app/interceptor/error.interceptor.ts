import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,

} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from 'src/app/rest-service/auth.service';
import {NotficationService} from '../shared/service/notfication.service';
import {environment} from 'src/environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private toastr: ToastrService, private notificationService: NotficationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.includes(environment.urlConfig + `login`)) {
            return next.handle(request).pipe(
                catchError(
                    err => {

                        if (err.status === 401 || err.status === 403) {
                            this.toastr.error('Incorrect password !'
                                , 'Fail');
                        }

                        if (err.status === 404) {
                            this.toastr.error('User does not exist', 'Fail');
                        }

                        if (err.status === 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();
                        }
                        /*if (err.status == 500) {
                          this.toastr.error('duplicated entry key', 'Fail')
                        }*/
                        if (err.status === 400 || err.status === 422) {
                            this.toastr.error(
                                'Fail', 'An error has occured some parts');
                        }
                        // throw the error message of the err
                        // each component can also display the error
                        console.log('from error interceptor:', err);

                        // here we can't throw the error message because the login component is displaying the error message:
                        // const errorMessage = err.error.message || err.statusText;

                        return throwError(err);
                    })
            );
        }

        if (request.url.includes(environment.urlConfig + `user`)) {

            return next.handle(request).pipe(
                catchError(
                    err => {

                        if (request.url.includes(environment.urlConfig + `user/create`)) {
                            if (err.status === 406) {
                                this.toastr.error('Email or mobile exists!', 'Fail');
                            }
                        }
                        if (request.url.includes(environment.urlConfig + `user/createWithoutPhoto`)) {
                            if (err.status === 406) {
                                this.toastr.error('Email or mobile exists!', 'Fail');
                            }
                        }
                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();

                        }
                        if (request.url.includes(environment.urlConfig + `user/adSkillsToUser`)) {

                            if (err.status === 406) {
                                this.toastr.error('skill exists!', 'Fail');
                            }
                        }
                        //here we can't throw the error message because the login component is displaying the error message:
                        //const errorMessage = err.error.message || err.statusText;

                        return throwError(err);
                    })
            );

        }
        if (request.url.includes(environment.urlConfig + `role`)) {

            return next.handle(request).pipe(
                catchError(
                    err => {
                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();

                        }
                        //throw the error message of the err
                        // each component can also display the error
                        console.log('from error interceptor:', err);

                        //here we can't throw the error message because the login component is displaying the error message:
                        //const errorMessage = err.error.message || err.statusText;

                        return throwError(err);
                    })
            );

        }

        if (request.url.includes(environment.urlConfig + `team`)) {

            return next.handle(request).pipe(
                catchError(
                    err => {

                        if (err.status === 401) {
                            this.toastr.error('you should be the team leader to do operation  !'
                                , 'Fail');
                        }
                        if (err.status === 403) {
                            this.toastr.error('you are forbidden !'
                                , 'Fail');
                        }
                        if (err.status === 404) {
                            this.toastr.error('Invalid Input', 'Fail');
                        }
                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();

                        }


                        if (err.status === 400 || err.status === 422) {
                            this.toastr.error(
                                'Fail', 'An error has occured some parts');
                        }
                        //throw the error message of the err
                        // each component can also display the error
                        console.log('from error interceptor:', err);

                        //here we can't throw the error message because the login component is displaying the error message:
                        //const errorMessage = err.error.message || err.statusText;

                        return throwError(err);
                    })
            );

        }
        if (request.url.includes(environment.urlConfig + `task`)) {

            return next.handle(request).pipe(
                catchError(
                    err => {

                        if (err.status === 403) {
                            this.toastr.error('please, Check your input!'
                                , 'Fail');
                        }

                        if (err.status === 406) {
                            this.notificationService.showInfo('Date is out of periode for team ! please, Enter validate Date!'
                                , 'ok!');
                        }


                        if (err.status === 401) {
                            this.toastr.error('you do not have permission to delete task!', 'Fail');
                        }

                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();

                        }

                        if (err.status == 500) {
                            this.toastr.error('Empty Input', 'Fail');
                        }
                        if (err.status === 400 || err.status === 422) {
                            this.toastr.error(
                                'Fail', 'An error has occured some parts');
                        }
                        //throw the error message of the err
                        // each component can also display the error
                        console.log('from error interceptor:', err);

                        //here we can't throw the error message because the login component is displaying the error message:
                        //const errorMessage = err.error.message || err.statusText;

                        return throwError(err);
                    }
                )
            );
        }
        if (request.url.includes(environment.urlConfig + `test`)) {

            return next.handle(request).pipe(
                catchError(
                    err => {

                        if (err.status === 401) {
                            this.toastr.error('you should be the team leader to delete the member !'
                                , 'Fail');
                        }

                        /*if (err.status === 404) {
                          this.toastr.error('Invalid Input', 'Fail')
                        }*/
                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                        }
                        if (err.status == 405) {
                            this.toastr.error('team Member does not have tasks', 'Fail');
                        }
                        if (err.status === 400 || err.status === 422) {
                            this.toastr.error(
                                'Fail', 'An error has occured some parts');
                        }
                        //throw the error message of the err
                        // each component can also display the error
                        console.log('from error interceptor:', err);
                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();

                        }
                        //here we can't throw the error message because the login component is displaying the error message:
                        //const errorMessage = err.error.message || err.statusText;

                        return throwError(err);
                    })
            );

        }
        if (request.url.includes(environment.urlConfig + `memberDashboard/`)) {

            return next.handle(request).pipe(
                catchError(
                    err => {
                        //throw the error message of the err
                        // each component can also display the error
                        console.log('from error interceptor:', err);

                        //here we can't throw the error message because the login component is displaying the error message:
                        //const errorMessage = err.error.message || err.statusText;
                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();

                        }
                        return throwError(err);
                    })
            );

        }
        if (request.url.includes(environment.urlConfig + `project`)) {

            return next.handle(request).pipe(
                catchError(
                    err => {

                        if (err.status === 406) {
                            this.notificationService.showInfo('Invalid date ! Enter a date in the project period'
                                , 'try Again!');
                        }


                        if (err.status === 404) {
                            this.toastr.error('project 404', 'Fail');
                        }
                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();

                        }

                        if (err.status == 500) {
                            this.toastr.error('project 500', 'Fail');
                        }
                        if (err.status === 400 || err.status === 422) {
                            this.toastr.error(
                                'Fail', 'An error has occured some parts');
                        }
                        //throw the error message of the err
                        // each component can also display the error
                        console.log('from error interceptor:', err);

                        //here we can't throw the error message because the login component is displaying the error message:
                        //const errorMessage = err.error.message || err.statusText;

                        return throwError(err);
                    })
            );

        }
        if (request.url.includes(environment.wbsConfig)) {

            return next.handle(request).pipe(
                catchError(
                    err => {


                        //throw the error message of the err
                        // each component can also display the error
                        console.log('from error interceptor:', err);

                        //here we can't throw the error message because the login component is displaying the error message:
                        //const errorMessage = err.error.message || err.statusText;
                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();

                        }
                        return throwError(err);
                    })
            );

        }

        if (request.url.includes(environment.urlConfig + `event`)) {

            return next.handle(request).pipe(
                catchError(
                    err => {


                        //throw the error message of the err
                        // each component can also display the error
                        console.log('from error interceptor:', err);
                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();

                        }
                        //here we can't throw the error message because the login component is displaying the error message:
                        //const errorMessage = err.error.message || err.statusText;

                        return throwError(err);
                    })
            );

        }
        if (request.url.includes(environment.urlConfig + `notification`)) {

            return next.handle(request).pipe(
                catchError(
                    err => {

                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();

                        }
                        //throw the error message of the err
                        // each component can also display the error
                        console.log('from error interceptor:', err);

                        //here we can't throw the error message because the login component is displaying the error message:
                        //const errorMessage = err.error.message || err.statusText;

                        return throwError(err);
                    })
            );

        }

        if (request.url.includes(environment.urlConfig + `teamWork`)) {

            return next.handle(request).pipe(
                catchError(
                    err => {

                        if (err.status === 401) {
                            this.toastr.error('you should be the team leader to delete the member !'
                                , 'Fail');
                        }

                        if (err.status === 404) {
                            this.toastr.error('Invalid Input', 'Fail');
                        }


                        if (err.status == 405) {
                            this.toastr.error('team Member does not have tasks', 'Fail');
                        }
                        if (err.status === 400 || err.status === 422) {
                            this.toastr.error(
                                'Fail', 'An error has occured some parts');
                        }
                        //throw the error message of the err
                        // each component can also display the error
                        console.log('from error interceptor:', err);
                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();

                        }
                        //here we can't throw the error message because the login component is displaying the error message:
                        //const errorMessage = err.error.message || err.statusText;

                        return throwError(err);
                    })
            );

        }

        if (request.url.includes(environment.wbsConfig)) {

            return next.handle(request).pipe(
                catchError(
                    err => {


                        //throw the error message of the err
                        // each component can also display the error
                        console.log('from error interceptor:', err);
                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();

                        }
                        //here we can't throw the error message because the login component is displaying the error message:
                        //const errorMessage = err.error.message || err.statusText;

                        return throwError(err);
                    })
            );

        }

        if (request.url.includes(environment.urlConfig + `WorkMember`)) {

            return next.handle(request).pipe(
                catchError(
                    err => {


                        if (err.status === 406) {
                            // this.toastr.error('Email or mobile exists!', 'Fail')
                        }
                        if (err.status == 0) {
                            this.toastr.error('An error occured, this is from our part, please try again later', 'Fail');
                            this.authService.logout();

                        }
                        if (err.status == 0) {
                            //  this.toastr.error('An error occured, this is from our part, please try again later', 'Fail')
                        }
                        console.log('from error interceptor:', err);

                        //here we can't throw the error message because the login component is displaying the error message:
                        //const errorMessage = err.error.message || err.statusText;

                        return throwError(err);
                    })
            );

        }


    }


}








