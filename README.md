# Description

  TBD.

# Prerequisite

Please follow [this article](https://faun.pub/setting-up-a-production-environment-using-our-local-development-server-and-aws-f5eea3b5be60) to setup AWS environment, including VPC, Security Group and EC2.

In addition, on the security group, the following ports also need to be opened for inbound traffic:

    1111, 1234, 1987, 2222, 2266, 3000, 3333, 4000, 5000, 6666, 8000, 8080, 8888

# Setup

1. Install this package

    `npm install -g mk-tunnel`

    or

    `yarn global add mk-tunnel`

2. Initialize the configurations

    `mk-tunnel init`

    ```
    Make sure you have the following information prepared

    - the IP or DNS of your EC2 instance
    - the path of the key file (.pem)
    ```

# Usage

`mk-tunnel start --port [PORT_TO_EXPOSE]`

# Troubleshooting

`mk-tunnel start --port [PORT_TO_EXPOSE] --debug`

