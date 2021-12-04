import React, {useRef} from 'react';
import * as Yup from 'yup';
import {Form} from '@unform/mobile';
import {Button, InputText, FormView} from './styles';
import {useNavigation} from '@react-navigation/core';

const OccurrenceRegistration = () => {
  const formRef = useRef();
  const navigation = useNavigation();

  const handleSubmit = async data => {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        gravidade: Yup.string().required(),
        acontecimento: Yup.string().length(11).required(),
        data: Yup.string().required(),
        hora: Yup.string().required(),
        local: Yup.string().required(),
        detalhes: Yup.string(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // submitLogin(data);
      console.log('Dados Validados!!!!');
      navigation.navigate('Home');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach(e => {
          if (e.path) {
            validationErrors[e.path] = e.message;
          }
        });
        formRef.current.setErrors(validationErrors);
      }
      console.error('erro ao registrar ocorrencia: ', error);
    }
  };

  return (
    <FormView>
      <Form onSubmit={data => handleSubmit(data)} ref={formRef}>
        <InputText label="Gravidade da Ocorrência" name="gravidade" />
        <InputText label="Qual foi o acontecimento" name="acontecimento" />
        <InputText label="Data" name="data" />
        <InputText label="Hora" name="hora" />
        <InputText label="Localização" name="local" />
        <InputText label="Detalhes" name="detalhes" />
      </Form>
      <Button
        text="Registrar"
        backgroundColor="DEEP_BLUE"
        type="filled"
        onPressCallback={() => formRef.current?.submitForm()}
      />
    </FormView>
  );
};

export default OccurrenceRegistration;
