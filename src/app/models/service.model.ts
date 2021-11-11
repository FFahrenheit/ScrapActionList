export class AppService{
    protected errorMessage = 'Service error';

    constructor(){}

    public getMessage(){
        return this.errorMessage;
    }
}