import ForgeUI, {
    Button, Table, Row,
    Form, Fragment,
    Macro, Cell,
    Image, Text,
    SectionMessage, TextField,
    render, useAction,
    useConfig, useProductContext,
    useState, UserPicker,
    RadioGroup, Radio
} from "@forge/ui";

import api from "@forge/api";
import { EnhancedText } from "./enhancedText"
import { Graph } from "./graph";

const STATE = {
    INPUT: 0,
    SUCCESS: 1,
    FAIL: 2
}

interface Stock {
    quote: {
        name: any,
        ticker: any,
        price: any,
        c: any,
        pc: any
    },
    assetProfile: {
        address: any,
        city: any, state: any, zip: any,
        country: any,
        phone: any,
        website: any,

        sector: any,
        industry: any,
        full_time: any,

        summary: any
    }
}

const App = () => {
    const [state, setState] = useState(STATE.INPUT);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const [q, setQuote] = useState(null);
    const [diff, setDifference] = useState(null);
    const [pc, setPercentChange] = useState(null);
    const [aProfile, setAssetProfile] = useState(null);

    switch (state) {
        case STATE.INPUT:
            return doInput();
        case STATE.SUCCESS:
            return doSuccess();
        case STATE.FAIL:
            return doFail();
    }

    function doInput() {
        return (
            <Fragment>
                <Image src="https://s.yimg.com/rz/p/yahoo_finance_en-US_s_f_pw_351X40_finance_2x.png" alt="s" />
                <Text>
                    *Stock Tracker*
                </Text>
                <EnhancedText size="larger" weight="bold" text="Select a Stock"></EnhancedText>
                <Form onSubmit={createIssue}>
                    <TextField label="Ticker" name="ticker" isRequired={true} />
                </Form>
            </Fragment>
        );
    }


    function doSuccess() {
        return (
            <Fragment>
                <Button
                    text="⬅️ Back"
                    onClick={() => {
                        setState(STATE.INPUT);
                    }}
                />
                <EnhancedText size="larger" weight="bold" text={q.name + " (" + q.ticker + ")"}></EnhancedText>
                <EnhancedText size="medium" weight="" text={"$" + q.price}></EnhancedText>
                <EnhancedText size="medium" weight="" text={diff + " (" + pc + ")"}></EnhancedText>
                <Button
                    text="🗠 Toggle Asset Profile"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                />
                {
                    isOpen &&
                    <Table>
                        <Row>
                            <Cell>
                                <Text>{aProfile.address}</Text>
                            </Cell>
                            <Cell>
                                <Text>{"**Sector(s)**: " + aProfile.sector}</Text>
                            </Cell>
                        </Row>
                        <Row>
                            <Cell>
                                <Text>{aProfile.city + ", " + aProfile.state + " " + aProfile.zip}</Text>
                            </Cell>
                            <Cell>
                                <Text>{"**Industry**: " + aProfile.industry}</Text>
                            </Cell>
                        </Row>
                        <Row>
                            <Cell>
                                <Text>{aProfile.country}</Text>
                            </Cell>
                            <Cell>
                                <Text>{"**Full Time Employees**: " + aProfile.full_time}</Text>
                            </Cell>
                        </Row>
                        <Row>
                            <Cell>
                                <Text>{aProfile.phone}</Text>
                            </Cell>
                            <Cell></Cell>
                        </Row>
                        <Row>
                            <Cell>
                                <Text>{aProfile.website}</Text>
                            </Cell>
                            <Cell></Cell>
                        </Row>
                        <Row>
                            <Cell></Cell><Cell></Cell>
                        </Row>
                    </Table>
                }
                {isOpen && <Text>**Description**</Text>}
                {isOpen && <Text>{aProfile.summary}</Text>}
            </Fragment>
        );
    }

    function doFail() {
        return (
            <Fragment>
                <Button
                    text="⬅️ Back"
                    onClick={() => {
                        setState(STATE.INPUT);
                    }}
                />
                <SectionMessage title="Error" appearance="error">
                    <Text>{error}</Text>
                </SectionMessage>
            </Fragment>
        );
    }

    function plus_minus(c, pc){
        if (c.charAt(0) == '-' && pc.charAt(0) == '-') {
            setDifference(c);
            setPercentChange(pc);
        } else {
            setDifference("+" + c);
            setPercentChange("+" + pc);
        }
    }

    async function createIssue({ ticker }) {

        const YAHOO_API_BASE = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/';
        const response = await await api.fetch(
            `${YAHOO_API_BASE}${ticker}?modules=price%2CassetProfile`,
        )
        const responseBody = await response.json();

        if (responseBody['quoteSummary']['error'] !== null) {
            // console.error(responseBody);
            const errorMessage = responseBody['quoteSummary']['error']['description'];
            setError(errorMessage);
            setState(STATE.FAIL);

        } else {

            const p = responseBody['quoteSummary']['result'][0]['price'];
            const ap = responseBody['quoteSummary']['result'][0]['assetProfile'];

            const stock1: Stock = {
                quote: {
                    name: p['longName'],
                    ticker: p['symbol'],
                    price: p['regularMarketPrice']['fmt'],
                    c: p['regularMarketChange']['fmt'],
                    pc: p['regularMarketChangePercent']['fmt']
                },
                assetProfile: {
                    address: ap['address1'],
                    city: ap['city'], state: ap['state'], zip: ap['zip'],
                    country: ap['country'],
                    phone: ap['phone'],
                    website: ap['website'],

                    sector: ap['sector'],
                    industry: ap['industry'],
                    full_time: ap['fullTimeEmployees'],
                    summary: ap['longBusinessSummary']

                }
            }
            console.log(stock1.quote);

            setError(responseBody.error);
            setQuote(stock1.quote);
            setAssetProfile(stock1.assetProfile);
            console.log(stock1.assetProfile);

            plus_minus(stock1.quote.c, stock1.quote.pc)

            setState(STATE.SUCCESS);
        }

    };

    async function createGraph({ticker}){
        const YAHOO_API_BASE = 'https://query2.finance.yahoo.com/v8/finance/chart/';
        const response = await await api.fetch(
            `${YAHOO_API_BASE}${ticker}?range=max&interval=1d&indicators=quote`,
        )
        const responseBody = await response.json();
    }
};

export const run = render(<Macro app={<App />} />);
