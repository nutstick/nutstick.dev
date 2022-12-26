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

  const tooltip = useTooltipState({
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
    if (form.values.code && form.values.guest && form.values.name) {
      tooltip.setOpen(true);
    }
  }, [form.values.code, form.values.guest, form.values.name, tooltip]);

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
              <FormInput
                className={clsx(inputClx, form.errors.name && errorClx)}
                required
                placeholder={t('rsvp.name')}
                name={form.names.name}
              />
            </FormGroup>
            <div className="w-full flex flex-col md:flex-row gap-4">
              <FormGroup className="flex-1">
                <FormLabel className="hidden" name={form.names.code}>
                  {t('rsvp.email')}
                </FormLabel>
                <FormInput
                  className={clsx(inputClx, form.errors.code && errorClx)}
                  required
                  placeholder={t('rsvp.email')}
                  name={form.names.code}
                />
              </FormGroup>
              <FormGroup className="w-full md:w-40">
                <FormLabel className="hidden" name={form.names.guest}>
                  {t('rsvp.guests')}
                </FormLabel>
                <FormInput
                  type="number"
                  min="1"
                  max="10"
                  className={clsx(inputClx, form.errors.guest && errorClx)}
                  required
                  placeholder={t('rsvp.guests')}
                  name={form.names.guest}
                />
              </FormGroup>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <div className={s.submitContainer}>
              <div className={s.submitBg}>
                <Image src={imgPattern} alt="" className="w-full h-full" />
              </div>
              <TooltipAnchor
                state={tooltip}
                as={FormSubmit}
                className={s.submit}
              >
                <Image className={s.heart} src={imgSubmit} alt={t('submit')} />
              </TooltipAnchor>
              <Tooltip state={tooltip} className={s.tooltip}>
                <TooltipArrow />
                {t('submit')}
              </Tooltip>
            </div>
          </Form>
        </motion.div>
        <Image
          className="w-full z-40 absolute bottom-0 select-none pointer-events-none"
          src={imgForeground}
          alt=""
        />
      </div>
    </>
  );
}

export default RSVPForm;
