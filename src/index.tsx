import ForgeUI, { Button, ConfigForm,
                    Form, Fragment, 
                    Macro, Option, 
                    Select, Text, 
                    TextArea, TextField, 
                    render, useAction, 
                    useConfig, useProductContext, 
                    useState, UserPicker, 
                    RadioGroup, Radio } from "@forge/ui";

import api from "@forge/api";
import React from 'react';
import './index.css'

const STATE = {
    INPUT: 0,
    SUCCESS: 1
}

interface Stock{
    name: any,
    ticker: any,
    price: any,
    c: any,
    pc: any
}

//const header = `h${this.props.priority}`;

const App = () => {
    const { accountId } = useProductContext();
    const [ state, setState ] = useState(STATE.INPUT);
    const [ error, setError ] = useState(null);

    const [ name, setName ] = useState(null);
    const [ tickerName, setTickerName ] = useState(null);
    const [ currentValue, setCurrentValue ] = useState(null);
    const [ diff, setDifference ] = useState(null);
    const [ pc, setPercentChange ] = useState(null)

    switch (state) {
        case STATE.INPUT:
            return doInput();
        case STATE.SUCCESS:
            return doSuccess();
    }

    function doInput() {
        return (
            <Fragment>
                <Text>
                    **Select a Stock**
                </Text>
                <Form onSubmit={createIssue}>
                    <TextField label="Ticker" name="ticker" isRequired={true} />
                </Form>
            </Fragment>
        );
    }

    function doSuccess() {
        return (
            <Fragment>
                <Text content = { name }/>
                <Text content = {tickerName}/>
                <Text content = {"$" + currentValue}/>
                <Text content = { diff + " (" + pc + "%)"}/>
            </Fragment>
        );
    }

    async function createIssue({ ticker }) {
        // setCurrentValue(null);
        // setDifference(null);

        const YAHOO_API_BASE = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/';
        await await api.fetch(
            `${YAHOO_API_BASE}${ticker}?modules=price%2CassetProfile`,
        ).then((response) => response.json()).then(res => {

            let stock1: Stock = {
                name: res['quoteSummary']['result'][0]['price']['shortName'],
                ticker: ticker,
                price: res['quoteSummary']['result'][0]['price']['regularMarketPrice']['fmt'],
                c: res['quoteSummary']['result'][0]['price']['regularMarketChange']['fmt'],
                pc: res['quoteSummary']['result'][0]['price']['regularMarketChangePercent']['fmt'],
            }
            console.log(stock1.name);
            console.log(stock1.price);
            // if(stock1.c.charAt(0) == '-' && stock1.pc.charAt(0) == '-'){
            console.log(stock1.c);
            console.log(stock1.pc);
            // } else {
            //     console.log("+" + stock1.c);
            //     console.log("+" + stock1.pc);
            // }    
        
            if (res['error'] !== 'null') {
                console.error(res);
                const errorMessage = res.error;      
                setError(errorMessage || 'That\'s an invalid Ticker');
            } else {
                setError(res.error);
                setName(stock1.name);
                setTickerName(ticker);
                setCurrentValue(stock1.price);

                if(stock1.c.charAt(0) == '-' && stock1.pc.charAt(0) == '-'){
                    setDifference(stock1.c);
                    setPercentChange(stock1.pc);
                } else {
                    setDifference("+" + stock1.c);
                    setPercentChange("+" + stock1.pc);
                }

                setState(STATE.SUCCESS);
                
            }
        });
    };
};

export const run = render(<Macro app={<App />} />);
