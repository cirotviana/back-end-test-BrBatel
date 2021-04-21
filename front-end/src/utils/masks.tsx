
import MaskedInput from 'react-text-mask';
export function CnpjMask(props: any) {
    const { inputRef, ...other } = props;
    return (
      <MaskedInput
        {...other}
        ref={(ref: any) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }