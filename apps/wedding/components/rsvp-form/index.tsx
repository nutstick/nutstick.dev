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
import { Dialog, DialogHeading, useDialogState } from 'ariakit/dialog';
import { Button } from 'ariakit/button';
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

const scale = {
  hidden: { strokeWidth: 0, opacity: 0 },
  visible: {
    strokeWidth: 8,
    opacity: 1,
    transition: {
      strokeWidth: { delay: 0.2, type: 'spring', duration: 0.3, bounce: 0 },
      opacity: { delay: 0.2, duration: 0.01 },
    },
  },
};

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 0.5, type: 'spring', duration: 0.5, bounce: 0 },
      opacity: { delay: 0.5, duration: 0.01 },
    },
  },
};

function RSVPForm() {
  const { t } = useTranslation('common');
  const form = useFormState({
    defaultValues: { name: '', code: '', guest: '' },
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const dialog = useDialogState({
    animated: true,
  });

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
    dialog.toggle();

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
      <Dialog
        state={dialog}
        className="dialog z-50 flex w-full max-w-lg flex-col items-center justify-center gap-6 rounded-md bg-white p-10 text-center"
        style={{ height: 'auto' }}
        backdropProps={{
          className: 'flex flex-col items-center justify-center',
        }}
      >
        <motion.svg
          width={96}
          height={96}
          viewBox="0 0 205 205"
          fill="none"
          initial="hidden"
          animate={dialog.mounted ? 'visible' : 'hidden'}
        >
          <motion.path
            variants={draw}
            custom={1}
            d="M52 112.5L81.3993 142.804C83.0554 144.511 85.8262 144.404 87.3464 142.575L148.5 69"
            stroke={'#ba9051'}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <motion.circle
            variants={scale}
            custom={1}
            cx="102.5"
            cy="102.5"
            r="98.5"
            stroke={'#ba9051'}
          />
        </motion.svg>
        <DialogHeading
          className="text-primary font-semibold"
          as="h3"
          style={{
            fontFamily: 'var(--font-cormarant-garamond)',
          }}
        >
          {t('rsvp.success.title')}
        </DialogHeading>
        <p
          className="text-[18px]"
          dangerouslySetInnerHTML={{
            __html: t('rsvp.success.content'),
          }}
        />
        <p
          className="text-[18px]"
          dangerouslySetInnerHTML={{
            __html: t('rsvp.success.footer'),
          }}
        />
        <div className="flex w-full flex-col items-center justify-center lg:flex-row">
          <Button
            onClick={() => {
              dialog.toggle();
            }}
          >
            {t('back')}
          </Button>
        </div>
      </Dialog>
      <div className={s.container}>
        <Image
          className="pointer-events-none absolute bottom-0 z-20 w-full select-none"
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
            <div className="flex w-full flex-col gap-4 md:flex-row">
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
                <Image src={imgPattern} alt="" className="h-full w-full" />
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
          className="pointer-events-none absolute bottom-0 z-30 w-full select-none"
          src={imgForeground}
          alt=""
        />
      </div>
    </>
  );
}

export default RSVPForm;
