class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.current = config.initial;
        this.historyPrev = null;
        this.historyNext = null;
        // console.log(this.config);
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.current;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        // console.log(state);
        if (this.config.states[state]) {
            this.historyPrev = this.current;
            this.current = state;
        } else {
            throw new Error('err');
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        const currentTransitions = this.config.states[this.current].transitions;

        if (currentTransitions[event]) {
            this.historyPrev = this.current;
            this.current = currentTransitions[event];
        } else {
            throw new Error('err');
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.current = this.config.initial;
        return this;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        // console.log(event);
        let statesOfRules = [];

        if (event) {
            for (let key in this.config.states) {
                if (this.config.states[key].transitions[event]) {
                    statesOfRules.push(key);
                }
            }
        } else {
            for (let key in this.config.states) {
                statesOfRules.push(key);
            }
        }
        // console.log(statesOfRules);
        return statesOfRules;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        // console.log('history: ', this.historyPrev);
        // console.log('current: ', this.current);
        if (!this.historyPrev) {
            return false;
        }
        this.historyNext = this.current;
        // console.log(this.historyNext);
        this.current = this.historyPrev;
        this.historyPrev = null;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (!this.historyNext) {
            return false;
        }
        this.historyPrev = this.current;
        this.current = this.historyNext;
        this.historyNext = null;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.historyPrev = null;
        this.historyNext = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
