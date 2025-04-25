import { Flex } from '@chakra-ui/react'
import AppDatePicker from 'components/redesign/date-picker/AppDatePicker'
import MessageBox from 'components/redesign/message-box/MessageBox'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import SwitchBox from 'pages/products/components/ProductDrawer/components/common/SwitchBox'
import React, { useState } from 'react'

function BlogToggles() {
    const { values, errors, setFieldValue } = useBlogForm()
    const [releaseDateSwitch, setReleaseDateSwitch] = useState(true)

    return (
        <Flex direction="column" gap={6} padding={6}>
            <SwitchBox
                title='Featured'
                description='Pin the post on the header.'
                switchProps={{
                    isChecked: false,
                    onChange: (e) => console.log("Featured")
                }}
            />

            <SwitchBox
                title='AI Summary'
                description='A quick summary to help readers understand the post at a glance.'
                switchProps={{
                    isChecked: false,
                    onChange: (e) => console.log("AI Summary")
                }}
            />

            <SwitchBox
                title='Comments'
                description='Enable or disable comments to manage interactions.'
                switchProps={{
                    isChecked: false,
                    onChange: (e) => console.log("Comments")
                }}
            />

            <SwitchBox
                title='Scheduled Release'
                description='Schedule a future publishing date when needed.'
                switchProps={{
                    isChecked: false,
                    onChange: (e) => console.log("Scheduled Release")
                }}
            >
                {releaseDateSwitch &&
                    <AppDatePicker
                        onChange={(value) => setFieldValue("launchDate", value.toISOString())}
                        minDate={new Date()}
                        // value={launchDate ? new Date(launchDate) : new Date()}
                        showTimeInput
                    />
                }
                {(errors.isFeatured && releaseDateSwitch) &&
                    <MessageBox
                        title={errors.commentsCount}
                        theme='warning'
                    />
                }
            </SwitchBox>
        </Flex>
    )
}

export default BlogToggles