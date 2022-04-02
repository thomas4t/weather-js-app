import { x } from '@xstyled/styled-components'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import Input, { InputType } from '@components/elements/Input'
import Button from '@components/elements/Button'
import useOnSubmitMutate from '@utils/forms/useOnSubmitMutate'

type Values = {
  email: string
  password: string
}

export type Props = {
  onSubmit: (values: Values) => void
  defaultValues: Partial<Values>
}

const LoginForm = ({ onSubmit, defaultValues }: Props): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues })

  const [mutateError, onSubmitEnhanced] = useOnSubmitMutate(onSubmit)
  console.log('watched field email value', watch('email')) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmitEnhanced)}>
      <x.h2>Example login form</x.h2>
      <x.div mb="2">
        {/* register your input into the hook by invoking the "register" function */}
        <Input defaultValue="test" {...register('email')} />
      </x.div>

      <x.div mb="2">
        {/* include validation with required or other standard HTML validation rules */}
        <Input type={InputType.password} {...register('password', { required: true })} />
      </x.div>

      {/* errors will return when field validation fails  */}
      <ErrorMessage errors={errors} name="password" as="p" />

      {/* common errors */}
      <p>{mutateError}</p>

      <Button type="submit">Login</Button>
    </form>
  )
}

export default LoginForm
