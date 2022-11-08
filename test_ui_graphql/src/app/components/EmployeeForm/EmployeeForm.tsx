import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import {TextareaAutosize} from "@mui/material";
import {MultipleSelect} from "app/shared/ui/select/MultipleSelect/MultipleSelect";
import {CompanyQueryQuery} from "graphql/graphql";
import {AutocompleteSelect} from "app/shared/ui/select/AutocompleteSelect/AutocompleteSelect";

interface PersonCompanyStatusProps {
    name: string
    relation: string
    position: string
    duties: string
}

export const EmployeeForm = (props: CompanyQueryQuery) => {
    const {applicantIndividualCompanyRelations, applicantIndividualCompanyPositions} = props
    const [form] = Form.useForm<PersonCompanyStatusProps>();

    const onFinishHandler = (val: any) => {
        console.log("submitted data", val)
    }

    const onClearFormHandler = () => {
        form.resetFields();
    }

    return (
        <Form form={form} name="employee-form" onFinish={onFinishHandler}>
            <Form.Item name="name" label="Your Name" rules={[
                () => ({
                    validator(_, value) {
                        if (!value || value.length < 5 || value.length > 10) {
                            return Promise.reject(new Error('Your name must be in range 1-5!'));
                        }
                        return Promise.resolve();
                    },
                }),
            ]}>
                <Input/>
            </Form.Item>

            {applicantIndividualCompanyPositions &&
			<Form.Item name="positions" label="Your position" rules={
                [{
                    required: true,
                    message: "This field must not be empty!"
                }]
            }
			>
				<AutocompleteSelect options={applicantIndividualCompanyPositions?.data || []} label="Your position"/>
			</Form.Item>
            }

            {applicantIndividualCompanyRelations &&
			<Form.Item name="relations" label="Your relations" rules={
                [{
                    required: true,
                    message: "This field must not be empty!"
                }]
            }
			>
				<MultipleSelect options={applicantIndividualCompanyRelations?.data || []} label="Your relations"/>
			</Form.Item>
            }

            <Form.Item name="duties" label="Your duties" rules={
                [{
                    required: true,
                    message: "This field must not be empty!"
                }]
            }
            >
                <TextareaAutosize minRows={4} style={{width: "100%"}}/>
            </Form.Item>

            <Button type="primary" htmlType="submit">
                Send
            </Button>
            <Button htmlType="button" onClick={onClearFormHandler}>
                Clear
            </Button>
        </Form>
    );
}
