@component('mail::message')
# Hello {{ $contact->name }}

We have received your message:

**Message:** {{ $contact->message }}

We will get back to you shortly.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
