import {
  Form,
  FormGroup,
  FormInput,
  FormLabel,
  FormSubmit,
  useFormState,
} from 'ariakit/form';
import {
  Tooltip,
  TooltipAnchor,
  TooltipArrow,
  useTooltipState,
} from 'ariakit/tooltip';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import s from './styles.module.css';

import imgSubmit from 'public/heart.svg';
import imgLogo from 'public/logo.svg';
import imgBackground from 'public/mail-background.svg';
import imgForeground from 'public/mail-foreground.svg';
import imgPattern from 'public/pattern.svg';
import { useEffect, useState } from 'react';

function RSVPForm() {
  const { t } = useTranslation('common');
  const form = useFormState({
    defaultValues: { name: '', code: '', guest: '' },
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitTooltip = useTooltipState({
    animated: true,
    placement: 'top',
  });

  const errorNameTooltip = useTooltipState({
    animated: true,
    placement: 'top',
  });
  const errorCodeTooltip = useTooltipState({
    animated: true,
    placement: 'top',
  });
  const errorGuestTooltip = useTooltipState({
    animated: true,
    placement: 'top',
  });

  const inputClx = clsx(
    'block w-full p-2.5',
    'bg-gray-50 border-b border-gray-300 text-gray-900 text-sm',
    'rounded-lg focus:ring-blue-500 focus:border-blue-500'
    // 'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-whit',
    // 'dark:focus:ring-blue-500 dark:focus:border-blue-500'
  );
  const errorClx = clsx(
    'ring-1',
    'ring-primary'
    // 'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-whit',
    // 'dark:focus:ring-blue-500 dark:focus:border-blue-500'
  );

  useEffect(() => {
    if (
      form.values.code &&
      form.values.guest &&
      form.values.name &&
      !Object.keys(form.errors)
    ) {
      submitTooltip.setOpen(true);
    }
  }, [
    form.errors,
    form.values.code,
    form.values.guest,
    form.values.name,
    submitTooltip,
  ]);

  form.useValidate(() => {
    setSubmitted(true);
  });

  form.useSubmit(async () => {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        name: form.values.name,
        code: form.values.code,
        guest: form.values.guest,
      }),
    });
    const json = await res.json();
    if (json.error) {
      switch (json.error) {
        case 2:
          form.setError(form.names.name, json.message);
          break;
        case 3:
          form.setError(form.names.code, json.message);
          break;
        case 4:
          form.setError(form.names.guest, json.message);
          break;
        case 1:
          setError(json.message);
          break;
      }
    }
  });

  const nameError = submitted && form.errors.name;
  const codeError = submitted && form.errors.code;
  const guestError = submitted && form.errors.guest;

  return (
    <>
      <div className={s.container}>
        <Image
          className="w-full z-20 select-none pointer-events-none absolute bottom-0"
          src={imgBackground}
          alt=""
        />
        <motion.div
          className={clsx(s.paper, 'shadow-lg')}
          initial={{ translateY: 200 }}
          whileInView={{ translateY: 0 }}
          transition={{ delay: 0.1, ease: 'easeOut' }}
          viewport={{ amount: 0.1 }}
        >
          <Form state={form} className="flex flex-col items-center gap-4">
            <div
              className={s.logo}
              style={{
                mask: `url(${imgLogo.src}) no-repeat center`,
                WebkitMask: `url(${imgLogo.src}) no-repeat center`,
              }}
            />
            <FormGroup className="w-full">
              <FormLabel className="hidden" name={form.names.name}>
                {t('rsvp.name')}
              </FormLabel>
              <TooltipAnchor
                state={errorNameTooltip}
                as={FormInput}
                className={clsx(inputClx, nameError && errorClx)}
                required
                placeholder={t('rsvp.name')}
                name={form.names.name}
              />
              <Tooltip
                state={errorNameTooltip}
                className={s.tooltip}
                hidden={!nameError}
              >
                <TooltipArrow />
                {nameError}
              </Tooltip>
            </FormGroup>
            <div className="w-full flex flex-col md:flex-row gap-4">
              <FormGroup className="flex-1">
                <FormLabel className="hidden" name={form.names.code}>
                  {t('rsvp.email')}
                </FormLabel>
                <TooltipAnchor
                  state={errorCodeTooltip}
                  as={FormInput}
                  className={clsx(inputClx, codeError && errorClx)}
                  required
                  placeholder={t('rsvp.email')}
                  name={form.names.code}
                />
                <Tooltip
                  state={errorCodeTooltip}
                  className={s.tooltip}
                  hidden={!codeError}
                >
                  <TooltipArrow />
                  {codeError}
                </Tooltip>
              </FormGroup>
              <FormGroup className="w-full md:w-40">
                <FormLabel className="hidden" name={form.names.guest}>
                  {t('rsvp.guests')}
                </FormLabel>
                <TooltipAnchor
                  state={errorGuestTooltip}
                  as={FormInput}
                  type="number"
                  min="1"
                  max="10"
                  className={clsx(inputClx, guestError && errorClx)}
                  required
                  placeholder={t('rsvp.guests')}
                  name={form.names.guest}
                />
                <Tooltip
                  state={errorGuestTooltip}
                  className={s.tooltip}
                  hidden={!guestError}
                >
                  <TooltipArrow />
                  {guestError}
                </Tooltip>
              </FormGroup>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <div className={s.submitContainer}>
              <div className={s.submitBg}>
                <Image src={imgPattern} alt="" className="w-full h-full" />
              </div>
              <TooltipAnchor
                state={submitTooltip}
                as={FormSubmit}
                className={s.submit}
              >
                <Image className={s.heart} src={imgSubmit} alt={t('submit')} />
              </TooltipAnchor>
              <Tooltip state={submitTooltip} className={s.tooltip}>
                <TooltipArrow />
                {t('submit')}
              </Tooltip>
            </div>
          </Form>
        </motion.div>
        <Image
          className="w-full z-30 absolute bottom-0 select-none pointer-events-none"
          src={imgForeground}
          alt=""
        />
      </div>
    </>
  );
}

export default RSVPForm;
