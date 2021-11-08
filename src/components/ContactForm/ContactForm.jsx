import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
// Выносим объект с примитивами в константу, чтобы было удобно сбрасывать.
// Нельзя использовать, если в каком-то свойстве состояния хранится сложный тип.
const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  // в форме стейт нужен только при сабмите, поэтому храним
  // его в компоненте формы, а при сабмите - отдаем наружу
  state = {
    ...INITIAL_STATE,
  };
  // Для всех инпутов создаем один обработчик
  // "паттерн ввод данных" ->
  handleChange = e => {
    // подходит для инпутов, у которых есть name and value, 
    // для радиокнопок, но не чекбоксов
    const { name, value } = e.currentTarget;
    // Различать инпуты будем по атрибуту "name",
    // применяя вычисляемые свойства объекта
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // у обьекта this (а это наш class ContactForm) проп, который 
    // передается при вызове в App - функция addContact. передаем 
    // ей текущее состояние state при Submitе формы
    this.props.addContact({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    
    return (
      <form
        onSubmit={this.handleSubmit} 
        className={s.form} 
        autoComplete="off">
        
        <label className={s.label}>
          Name
          <input
            name="name"
            type="text"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
                value={name}
                onChange={this.handleChange}
                className={s.input}
          />
        </label>

        <label className={s.label}>
          Number
          <input
            name="number"
            type="tel"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
                value={number}
                onChange={this.handleChange}
                className={s.input}
          />
        </label>        

        <button type="submit" className={s.btn}>Add contact</button>
      </form>
    );
  }
};

export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
}
// Проблема обновления состояния - всегда должно быть новое после рендера,  
// а не мутировать по ссылке старое.
// Проверка на имутабеольность (равны ли эти значения между рендерами) ->
// componentDidUpdate(prevProps, prevState) {
//   console.log(prevState.name === this.state.name);
// }