import React from "react";
import {CompanyQueryDocument} from "graphql/graphql";
import {Card, CardContent, CardHeader} from "@mui/material";

import CompanyRelations from "app/components/CompanyRelations/CompanyRelations";
import CompanyPositions from "app/components/CompanyPositions/CompanyPositions";
import {EmployeeForm} from "app/components/EmployeeForm/EmployeeForm";
import {useFetchData} from "app/shared/hooks/useFetchData";
import {Spinner} from "app/shared/ui/spinner/Spinner";

import 'styles/App.scss';
import "antd/dist/antd.css";


const url = "http://152.228.215.94:83/api"

function App() {
    //const [selectedTitle, setSelectedTitle] = useState<string>();

    const {data, isLoading, error} = useFetchData(url, CompanyQueryDocument as string)

    if (error) return <div>Ошибка !</div>
    if (isLoading) return <div className="centered"><Spinner className="lds-roller"/></div>

    return (
        <div className="App">
            <Card sx={{width: "40%", minHeight: 300}}>
                <CardHeader header={<h2>Custom selectBox</h2>}/>
                <CardContent sx={{width: "100%"}}>
                    <CompanyRelations options={data?.applicantIndividualCompanyRelations?.data as []}/>
                    <CompanyPositions options={data?.applicantIndividualCompanyPositions?.data as []}/>
                </CardContent>
            </Card>
            <Card sx={{width: "50%", minHeight: 300}}>
                <CardHeader header={<h2>Person Data Form</h2>}/>
                <CardContent sx={{width: "100%"}}>
                    <EmployeeForm {...data} />
                </CardContent>
            </Card>

        </div>
    );
}

export default App;
