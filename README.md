# n8n‑nodes‑truora

This is an [n8n](https://n8n.io/) community node that lets you
interact with [Truora](https://www.truora.com) in your automations. Truora
provides background checks for people, vehicles and companies and
exposes a REST API for integrating these services into your own
applications【763529563744859†L26-L41】.

The **Truora Check API** can perform three main types of background
checks: personal, vehicle and company【763529563744859†L26-L41】.  In a
personal check, the API verifies a national ID across multiple
databases and returns information such as personal identity,
criminal records and professional history.  Vehicle checks verify
ownership and check driving and criminal records【763529563744859†L34-L38】.  A company
check validates a tax ID or company name and returns legal and
media information【763529563744859†L39-L42】.

## Installation

Follow the [installation guide for community
nodes](https://docs.n8n.io/integrations/community-nodes/installation/)
to install this package.  Once installed you will find the **Truora**
node in the n8n editor.

## Operations

This first version of the Truora node focuses on the background check
functionality. The following operations are available:

- **Create Background Check** – Create a new background check for a
  person, vehicle or company. You must supply a national ID, the
  country in which to perform the check, the type of check and
  whether you have authorisation from the individual.  Additional
  optional fields such as date of birth, a custom input string and a
  flag to force the creation of a new check can also be provided【938600979799405†L70-L103】.
- **Get Background Check** – Retrieve the details of an existing
  background check by its `check_id`.  The Truora API returns the
  current status and result of the check【938600979799405†L104-L115】.

The node uses the [checks endpoints](https://api.truora.com/v1/checks)
described in the API documentation. Truora also offers endpoints for
reports, configuration, continuous checks, behaviour and hooks【763529563744859†L61-L90】.
Support for these will be added in future versions.

## Credentials

All requests require an API key.  According to the Truora
documentation, authentication is achieved by including a token in the
`Truora-API-Key` header【215324561460098†L46-L53】.  In n8n you configure this
under **Credentials → Truora API** and provide your API key and
(optionally) a custom base URL.  The node automatically injects the
header on every request.

## Usage

To create a background check in n8n:

1. Drag a **Truora** node into your workflow and select your
   **Truora API** credentials.
2. Choose **Background Check** as the resource and **Create** as the
   operation.
3. Fill in the required parameters.  For example, for a person in
   Colombia you would set `nationalId` to the ID number, `country`
   to `CO`, `checkType` to `person` and ensure `userAuthorized` and
   `forceCreation` are `true`.  These fields correspond to the
   parameters described in Truora’s guide for creating a check【938600979799405†L70-L103】.
4. Execute the node.  The response will include a `check_id` which
   you can use with the **Get** operation to poll for results【938600979799405†L104-L115】.

## Compatibility

This package requires n8n v1 and Node.js v20.15 or higher.  It has
been developed against Truora’s v1 Check API (see the API preview
documentation【763529563744859†L61-L90】).  Behaviour with earlier or
future API versions has not been tested.

## Resources

- [Truora documentation](https://dev.truora.com/)
- [Checks API preview on APIs.guru](https://apis.guru/apis/truora.com)
