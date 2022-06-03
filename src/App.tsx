import React, { useState } from 'react';
import { Container, Divider, Grid, Input, Button, Form, Label } from 'semantic-ui-react';
import DropdownExampleSimple from './dropdown';
import MenuSecondary from './Menu';
import TableExamplePagination from './Table';
import axios from 'axios';
import MenuExampleTabular from './TMenu';
import { openStdin } from 'process';


const options = [
  { key: 1, text: 'Email', id: 'email', value: 1, hint: 'me@gmail.com' },
  { key: 2, text: 'Phone Number', id: 'phone', value: 2, hint: '775212129' },
  { key: 3, text: 'IP Address', id: 'ip', value: 3, hint: '134.35.122.183' },
]

function objForEach<T>(obj: T, f: (k: keyof T, v: T[keyof T]) => void): void {
  for (let k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      f(k, obj[k]);
    }
  }
}

const validEmail = new RegExp(
  '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
)
const validPhone = new RegExp('^[0-9]+$');
function ValidateIPaddress(ipaddress: string) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
    return (true)
  }
  alert("You have entered an invalid IP address!")
  return (false)
}
function App() {
  const [value, setValue] = useState(1);
  const [formState, setFormState] = useState({
    'email': '',
    'ip': '',
    'phone': '',
    'formError': '',
  });
  let email = '';
  let formValid = true;
  const [dataOb, setOb] = useState({});
  const [loader, setLoader] = useState(false);
  const [collapse, setCl] = useState(false);
  return (
    <div>
      <MenuSecondary />
      <Container>
        <div style={{ marginTop: 60 }}></div>
        <Grid columns='equal' >

          <Grid.Column mobile={16} tablet={8} computer={5}>

            <h3>Type of data you can lookup for:</h3>
            <Label color='brown'>Email</Label>
            <Label color='brown'>Phone Number</Label>
            <Label color='brown'>IP Address</Label>
            <DropdownExampleSimple currentValue={value} changeHandler={setValue} options={options} /> <Divider />
            <Label color='grey' pointing={'below'}>
              Hint: {options[value - 1].hint}
            </Label>
            <div style={{ marginTop: 10 }}></div>
            <Form>
              <Form.Field>
                <Input label={options[value - 1].text} placeholder={`Enter a valid ${options[value - 1].text}`} name={options[value - 1].id} onChange={(e) => {
                  let name = e.target.name;
                  let value = e.target.value;
                  setFormState({ ...formState, [name]: value });
                }} fluid maxLength={options[value - 1].id === 'phone' ? 9 : null} />
                {/* {formState.formError.length > 1 && <Label basic color='red' pointing="above">{formState.formError}</Label>} */}
              </Form.Field>
            </Form>
            <div style={{ marginTop: 15 }}></div>
            {options[value - 1].id === 'ip' && <a href='https://whatismyipaddress.com/' target="_blank" className='ui secondary button'>find your ip address</a>}
            <Button content='Search' primary onClick={async () => {

              setCl(true);

              if (options[value - 1].id === 'email') {
                if (!validEmail.test(formState.email)) {
                  alert("You have entered an invalid email!")
                  setFormState({ ...formState, formError: "email is incorrect", }
                  );
                  formValid = false;
                  return;
                }
              }
              if (options[value - 1].id === 'phone') {
                if (formState.phone.length < 9) {
                  alert("You have entered an invalid yemeni phone number!")
                }
                if (!validPhone.test(formState.phone)) {
                  alert("You have entered an invalid yemeni phone number!")
                  setFormState({ ...formState, formError: "phone is incorrect", });
                  formValid = false;
                  return;

                }
              }
              if (options[value - 1].id === 'ip') {
                if (!ValidateIPaddress(formState.ip)) {
                  setFormState({ ...formState, formError: "ip is incorrect", });
                  formValid = false;
                  return;
                }
              }
              setLoader(true);
              if (formValid) {
                let res;
                if (options[value - 1].id === 'email') {
                  res = await axios.get(`http://localhost:5000/email-lookup?email=${formState.email}`);
                } else if (options[value - 1].id === 'phone') {
                  res = await axios.get(`http://localhost:5000/phone-lookup?phone=${formState.phone}`);
                } else {
                  res = await axios.get(`http://localhost:5000/ip-lookup?ip=${formState.ip}`);
                }
                setCl(false);
                setOb(res.data.data);
              }
              setLoader(false);
            }

            } />
          </Grid.Column>
          <Grid.Column computer={11} mobile={16} tablet={8}>
            <MenuExampleTabular loader={loader} collapse={collapse} dataOb={dataOb} />
            {/* <TableExamplePagination /> */}

          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
