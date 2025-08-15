import {
  INodeProperties,
  INodeType,
  INodeTypeDescription,
  NodeConnectionType,
} from 'n8n-workflow';

/*
 * Operations for the Background Check resource. Each entry here
 * defines a visible option in the node UI as well as how the
 * underlying HTTP request should be performed. The routing
 * information instructs n8n which method and URL to use. Fields
 * defined further below are conditionally displayed based on the
 * selected operation.
 */
const backgroundCheckOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['backgroundCheck'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new background check',
        action: 'Create a background check',
        routing: {
          request: {
            method: 'POST',
            url: '/checks',
          },
        },
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve the details of an existing background check',
        action: 'Get a background check',
        routing: {
          request: {
            method: 'GET',
            url: '=/checks/{{$parameter.checkId}}',
          },
        },
      },
    ],
    default: 'create',
  },
];

/*
 * Fields specific to each operation. Use the `displayOptions.show` property
 * to restrict when a field is shown. The `routing.send` field tells
 * n8n how to include the value in the request (for example as a
 * body parameter). Truora expects POST requests to be sent using
 * `application/x-www-form-urlencoded` format【938600979799405†L70-L97】. To achieve this we
 * send each parameter as part of the request body. n8n will
 * automatically serialise the body into a form‑encoded string when
 * the `Content-Type` header is set appropriately in the node’s
 * `requestDefaults` (see below).
 */
const backgroundCheckFields: INodeProperties[] = [
  // Fields for creating a background check
  {
    displayName: 'National ID',
    name: 'nationalId',
    type: 'string',
    default: '',
    required: true,
    description:
      'The national ID of the person, vehicle, or company to check. Numbers only.',
    displayOptions: {
      show: {
        resource: ['backgroundCheck'],
        operation: ['create'],
      },
    },
    routing: {
      send: {
        property: 'national_id',
        type: 'body',
      },
    },
  },
  {
    displayName: 'Country',
    name: 'country',
    type: 'options',
    default: 'CO',
    options: [
      { name: 'All (International)', value: 'ALL' },
      { name: 'Brazil', value: 'BR' },
      { name: 'Colombia', value: 'CO' },
      { name: 'Chile', value: 'CL' },
      { name: 'Costa Rica', value: 'CR' },
      { name: 'Mexico', value: 'MX' },
      { name: 'Peru', value: 'PE' },
    ],
    description: 'Country where the check should be performed【938600979799405†L70-L87】.',
    displayOptions: {
      show: {
        resource: ['backgroundCheck'],
        operation: ['create'],
      },
    },
    routing: {
      send: {
        property: 'country',
        type: 'body',
      },
    },
  },
  {
    displayName: 'Type',
    name: 'checkType',
    type: 'options',
    default: 'person',
    options: [
      { name: 'Person', value: 'person' },
      { name: 'Vehicle', value: 'vehicle' },
      { name: 'Company', value: 'company' },
    ],
    description: 'Type of check to perform【938600979799405†L88-L97】.',
    displayOptions: {
      show: {
        resource: ['backgroundCheck'],
        operation: ['create'],
      },
    },
    routing: {
      send: {
        property: 'type',
        type: 'body',
      },
    },
  },
  {
    displayName: 'Date of Birth',
    name: 'dateOfBirth',
    type: 'string',
    default: '',
    placeholder: 'YYYY-MM-DD',
    description:
      'For background checks in Brazil, provide the date of birth in ISO format【938600979799405†L91-L93】.',
    displayOptions: {
      show: {
        resource: ['backgroundCheck'],
        operation: ['create'],
      },
    },
    routing: {
      send: {
        property: 'date_of_birth',
        type: 'body',
      },
    },
  },
  {
    displayName: 'User Authorized',
    name: 'userAuthorized',
    type: 'boolean',
    default: true,
    description:
      'Indicates that you have the authorization of the person to be checked【938600979799405†L94-L96】.',
    displayOptions: {
      show: {
        resource: ['backgroundCheck'],
        operation: ['create'],
      },
    },
    routing: {
      send: {
        property: 'user_authorized',
        type: 'body',
      },
    },
  },
  {
    displayName: 'Force Creation',
    name: 'forceCreation',
    type: 'boolean',
    default: true,
    description:
      'Force the creation of a new check instead of searching for a previous one【938600979799405†L97-L99】.',
    displayOptions: {
      show: {
        resource: ['backgroundCheck'],
        operation: ['create'],
      },
    },
    routing: {
      send: {
        property: 'force_creation',
        type: 'body',
      },
    },
  },
  {
    displayName: 'Custom Input',
    name: 'customInput',
    type: 'string',
    default: '',
    description:
      'Optional free‑form input (up to 128 characters) to include additional information【938600979799405†L100-L103】.',
    displayOptions: {
      show: {
        resource: ['backgroundCheck'],
        operation: ['create'],
      },
    },
    routing: {
      send: {
        property: 'custom_input',
        type: 'body',
      },
    },
  },
  // Field for getting a background check
  {
    displayName: 'Check ID',
    name: 'checkId',
    type: 'string',
    default: '',
    required: true,
    description: 'Unique identifier of the background check to retrieve【938600979799405†L104-L115】.',
    displayOptions: {
      show: {
        resource: ['backgroundCheck'],
        operation: ['get'],
      },
    },
    routing: {
      request: {
        // The URL is set on the operation, we do not need to send this value
        // as part of the body or query. If we include routing.send here n8n
        // would add it as an additional parameter, which is not desired.
      },
    },
  },
];

/**
 * Truora node definition.
 */
export class Truora implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Truora',
    name: 'truora',
    icon: {
      light: 'file:truora.svg',
      dark: 'file:truora.svg',
    },
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Truora background check API',
    defaults: {
      name: 'Truora',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    // require credentials
    credentials: [
      {
        name: 'truoraApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: '={{$credentials.baseUrl}}',
      // Truora expects x-www-form-urlencoded for POST operations
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Background Check',
            value: 'backgroundCheck',
          },
        ],
        default: 'backgroundCheck',
      },
      ...backgroundCheckOperations,
      ...backgroundCheckFields,
    ],
  };
}
