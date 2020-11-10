import { AuthPage } from './AuthPage.js';
import { HomePage } from './HomePage.js';

/*
The root of all components. Checks for a session
with the server and then renders either the
sign in page or the home page.
*/

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasSession: false
        };
    }
    componentDidMount(){
        this.checkSession();
    }
    render(){
        if( this.state.hasSession ){
            return ( <HomePage signOut={ () => this.signOut() }/> );
        }else{
            return (
                <AuthPage
                    signIn={ () => {this.checkSession() } }
                />
            );
        }
    }
    checkSession(){
        fetch( "/CheckSession", {method: "POST"} )
            .then( (response) => response.json() )
            .then( (result) => {
                this.setState({
                    hasSession: result.hasSession
                });
            }).catch( (reason) =>{
                this.errorMessage( "There was an error checking for a session: " + reason );
            });
    }
    signOut(){
        fetch( "/EndSession", {method: "POST"} )
            .then( response => {
                this.checkSession();
            }).catch( reason => {
                this.errorMessage( "There was an error signing out: " + reason );
            });
    }
    errorMessage( message ){
        console.log( message );
    }
}



ReactDOM.render( <App />, document.getElementById("root") );