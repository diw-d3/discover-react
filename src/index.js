import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

let name = 'Fiorella';
let user = {
    firstName: 'Fiorella',
    lastName: 'Mota',
    avatar: 'https://www.gravatar.com/avatar/5355a3882df0fdd7689f8b0b5dc50720'
}

function fullName (user) {
    return user.firstName + ' ' + user.lastName;
}

ReactDOM.render(
    <div>
        <h1>Bonjour {name} !</h1>
        <h2>{fullName(user)}</h2>
        <img src={user.avatar} className="mon-image" width="50" alt={user.firstName} />
    </div>,
    document.getElementById('root')
);


// Exemple du DOM
function tick() {
    const element = (
      <div>
        <h1>Bonjour Fiorella !</h1>
        <h2>Il est {new Date().toLocaleTimeString()}.</h2>
      </div>
    );

    ReactDOM.render(element, document.getElementById('root2'));
}

setInterval(tick, 1000);

// React sans JSX
let heart = React.createElement('span', null, '😍');

let el = React.createElement('h1', {
    className: 'title',
    style: { backgroundColor: 'red' }
}, 'Hello ' + user.firstName, heart);

ReactDOM.render(
    el,
    document.getElementById('root3')
);

// Composant React
class Welcome extends React.Component {
    render() {
        return (
            <h1 className={this.props.gender.toLowerCase()}>
                Bonjour {this.props.name}
            </h1>
        );
    }
}

// Composant Clock
class Clock extends React.Component {
    constructor(props) {
        super(props); // Appelle le constructor parent
        this.state = {date: new Date()};
    }

    componentDidMount() { // DOM Ready
        this.timer = setInterval(() => {
            this.setState({date: new Date()});
        }, 1000);
    }

    componentWillUnmount() { // Disparait du DOM
        clearInterval(this.timer);
    }

    render() {
        return (
            <h2>
                Il est {this.state.date.toLocaleTimeString('fr-FR', {timeZone: this.props.timeZone})}
                à {this.props.timeZone}
            </h2>
        );
    }
}

// Compteur
class MyCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {number: 0};
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            // this.state.number++;
            // this.setState({number: this.state.number + 1});
            this.setState((state) => ({
                number: ++state.number
            }));
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return 'COMPTEUR : ' + this.state.number;
    }
}

// Les événements
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggle: true};

        // Permet d'accéder à this dans la fonction
        // this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (event, monArgument) => {
        console.log(monArgument); // Affiche toto
        console.log(event);
        this.setState(state => ({
            isToggle: !state.isToggle
        }));

        /* this.setState(state => {
            return {isToggle: !state.isToggle};
        }); */
    }

    render() {
        let message;

        if (this.state.isToggle) { // L'ampoule est éteinte
            message = <h2>L'ampoule est éteinte.</h2>;
        } else {
            message = <h2>L'ampoule est allumée.</h2>;
        }

        return (
            <div>
                {message}
                <button onClick={(e) => this.handleClick(e, 'toto')}>
                    {this.state.isToggle ? 'On' : 'Off'}
                </button>
            </div>
        );
    }
}

// Compteur avec incrémentation
class Counter extends React.Component {
    constructor(props) {
        super(props);
        // On peut initialiser le compteur à 4 par exemple
        this.state = {value: props.init ? props.init : 0};
    }

    handleIncrement() {
        this.setState(state => ({
            value: ++state.value
        }));
    }

    handleDecrement() {
        this.setState(state => ({
            value: --state.value
        }));
    }

    // increment vaut 1 ou -1
    /* handleChange(increment) {
        this.setState(state => ({
            value: state.value + increment
        }));
    } */

    render() {
        let buttonPlus = <button onClick={() => this.handleIncrement()}>+</button>;

        // Quand le max du compteur est atteint
        if (this.state.value >= this.props.max) {
            buttonPlus = null;
        }

        return (
            <div>
                <button onClick={() => this.handleDecrement()}>-</button>
                <span>{this.state.value}</span>
                {buttonPlus}
            </div>
        );
    }
}

// setInterval(() => {
    ReactDOM.render(
        <div>
            <Welcome name="Fiorella" gender="FILLE" />
            <Welcome name="Matthieu" gender="GARCON" />
            <Clock timeZone="Europe/London" />
            <Clock timeZone="Europe/Paris" />
            <MyCounter />
            <Button />
            <Counter />
            <Counter init={4} max={10} />
            <Counter max={3} />
        </div>,
        document.getElementById('root4')
    );
// }, 1000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
