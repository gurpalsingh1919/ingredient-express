@component('mail::message')
# New Contact Message

**Name:** {{ $contact->name }}
**Email:** {{ $contact->email }}
**Phone:** {{ $contact->phone ?? 'N/A' }}
**Message:** {{ $contact->message }}

@endcomponent